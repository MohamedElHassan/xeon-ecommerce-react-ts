import { FC, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Banknote, Package } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { useAppSelector, useAppDispatch } from "@/store/store";
import { useNavigate } from "react-router-dom";
import { clearCart } from "@/store/features/cartSlice";
import { addToast } from "@/store/features/toastSlice";
import { Check } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { orderService } from "@/api";

interface ICheckoutPageProps {}

interface IFormData {
  receiver: string;
  phone1: string;
  phone2?: string;
  government: string;
  area: string;
  address: string;
  notes?: string;
}

interface Government {
  id: string;
  name: string;
}

interface Area {
  id: string;
  name: string;
  government_id: string;
}

const schema = z.object({
  receiver: z.string().min(1, "Receiver name is required"),
  phone1: z
    .string()
    .min(11, "Phone number must be 11 digits")
    .max(11, "Phone number must be 11 digits")
    .regex(/^01[0125][0-9]{8}$/, "Please enter a valid Egyptian phone number"),
  phone2: z
    .string()
    .regex(/^01[0125][0-9]{8}$/, "Please enter a valid Egyptian phone number")
    .optional()
    .or(z.literal("")),
  government: z.string().min(1, "Government is required"),
  area: z.string().min(1, "Area is required"),
  address: z.string().min(1, "Address is required"),
  notes: z.string().optional(),
});

const VodafoneCashIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className="w-6 h-6"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12z"
      fill="#e60000"
    />
    <path
      d="M7.5 16.5v-9a2 2 0 012-2h5a2 2 0 012 2v9M7.5 13.5h9"
      stroke="#fff"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10.5 11.5v4M13.5 11.5v4"
      stroke="#fff"
      strokeWidth={1.5}
      strokeLinecap="round"
    />
  </svg>
);

const CheckoutPage: FC<ICheckoutPageProps> = (props) => {
  const [paymentMethod, setPaymentMethod] = useState("vodafone_cash");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderTotal, setOrderTotal] = useState(0);
  const [orderItems, setOrderItems] = useState<typeof items>([]);
  const [governments, setGovernments] = useState<Government[]>([]);
  const [areas, setAreas] = useState<Area[]>([]);
  const [selectedGovernment, setSelectedGovernment] = useState<string>("");
  const [selectedGovernmentId, setSelectedGovernmentId] = useState<string>("");
  const { items, total } = useAppSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<IFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      receiver: "",
      phone1: "",
      phone2: "",
      government: "",
      area: "",
      address: "",
      notes: "",
    },
  });

  // Fetch governments on mount
  useEffect(() => {
    const fetchGovernments = async () => {
      try {
        const response = await axios.get(
          "http://localhost/xeon-backend-dashboard/api/get_government.php"
        );
        setGovernments(response.data.feed);
      } catch (error) {
        console.error("Error fetching governments:", error);
      }
    };
    fetchGovernments();
  }, []);

  // Fetch areas when government changes
  useEffect(() => {
    const fetchAreas = async () => {
      if (selectedGovernmentId) {
        try {
          const response = await axios.get(
            `http://localhost/xeon-backend-dashboard/api/get_areas.php?government_id=${selectedGovernmentId}`
          );
          setAreas(response.data.feed);
          // Reset area selection when government changes
          setValue("area", "");
        } catch (error) {
          console.error("Error fetching areas:", error);
        }
      } else {
        setAreas([]);
      }
    };
    fetchAreas();
  }, [selectedGovernmentId, setValue]);

  // useEffect(() => {
  //   if (items.length === 0 && !orderSuccess) {
  //     navigate("/products", {
  //       replace: true,
  //     });
  //   }
  // }, [items, navigate, orderSuccess]);

  const getVodafoneCashText = () => {
    const discountedTotal = (orderTotal * 0.95).toFixed(2);
    const itemsDetails = orderItems
      .map(
        (item) =>
          `${item.name} (Size: ${item.selectedSize}, Color: ${item.selectedColor}, Qty: ${item.quantity})`
      )
      .join("\n");
    return `Hi, I want to pay via Vodafone Cash for my order.\n\nOrder Details:\n${itemsDetails}\n\nTotal Amount: EGP ${discountedTotal}`;
  };

  const onSubmit = async (data: IFormData) => {
    setIsSubmitting(true);
    const orderDetails = items
      .map(
        (item) =>
          `${item.name} (Size: ${item.selectedSize}, Color: ${item.selectedColor}, Qty: ${item.quantity})`
      )
      .join("\n");
    console.log("Order Details:\n", orderDetails);
    console.log(data);
    try {
      const response = await orderService.addOrder({
        ...data,
        paymentMethod,
        items,
        total: paymentMethod === "vodafone_cash" ? total * 0.95 : total,
        discount: paymentMethod === "vodafone_cash" ? total * 0.05 : 0,
      });
      console.log(response.result.expected_branch); // this is the expected branch
      console.log(response.result.code); // this is the order code(Tracking Number)
      // if (response.status === "success") {
        setOrderTotal(total);
        setOrderItems(items);
        setOrderSuccess(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
        dispatch(clearCart());
        dispatch(
          addToast({
            title: "Order Placed Successfully!",
            message: "Thank you for your purchase.",
            type: "success",
          })
        );
      // } else {
      //   throw new Error(response.message || "Failed to place order");
      // }
    } catch (error) {
      console.error("Error submitting order:", error);
      dispatch(
        addToast({
          title: "Error",
          message:
            error instanceof Error
              ? error.message
              : "Failed to place order. Please try again.",
          type: "error",
        })
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (orderSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-archivo">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-white p-8 rounded-2xl shadow-sm">
            <div className="w-16 h-16 bg-green-100 rounded-full mx-auto flex items-center justify-center mb-6">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold mb-4">
              Order Placed Successfully!
            </h2>
            <p className="text-gray-600 mb-6">
              Thank you for your order. We'll process it right away.
            </p>

            {paymentMethod === "vodafone_cash" && (
              <div className="bg-blue-50 p-6 rounded-xl mb-6">
                <h3 className="font-semibold mb-2">Complete Your Payment</h3>
                <p className="text-gray-600 mb-4">
                  Please send EGP {(orderTotal * 0.95).toFixed(2)} to our
                  Vodafone Cash number:
                </p>
                <a
                  href={`https://wa.me/00201025387499?text=${encodeURIComponent(
                    getVodafoneCashText()
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-lg hover:bg-black/80 transition-colors"
                >
                  <VodafoneCashIcon />
                  <span>Send Payment Now</span>
                </a>
              </div>
            )}

            <div className="space-x-4">
              <Button
                onClick={() => navigate("/products")}
                variant="outline"
                className="px-6 py-3"
              >
                Continue Shopping
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6 sm:py-8 md:py-12 px-4 sm:px-6 lg:px-8 font-archivo">
      <div className="w-full max-w-3xl mx-auto">
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl p-4 sm:p-6 md:p-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6 sm:mb-8 font-archivo">
            Complete Your Order
          </h1>

          <div className="mb-6 sm:mb-8">
            <Accordion type="single" collapsible defaultValue="order-summary">
              <AccordionItem value="order-summary">
                <AccordionTrigger className="text-base sm:text-lg font-semibold">
                  <div className="flex items-center gap-2">
                    <Package className="w-5 h-5" />
                    Order Summary
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="mt-4 space-y-4">
                    <div className="space-y-3">
                      {items.map((item) => (
                        <div
                          key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
                          className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg bg-gray-50/80 hover:bg-gray-50 transition-colors"
                        >
                          <div className="relative w-32 sm:w-16 md:w-20 h-48 sm:h-16 md:h-20 rounded-md overflow-hidden flex-shrink-0 border border-gray-100">
                            <img
                              src={item.image[0]}
                              alt={item.name}
                              className="absolute inset-0 w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                            />
                          </div>
                          <div className="flex-1 min-w-0 w-full">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                              <h3 className="font-medium text-base sm:text-lg truncate max-w-full sm:max-w-[300px] md:max-w-[400px]">
                                {item.name}
                              </h3>
                              <div className="text-right flex flex-row sm:flex-col items-center sm:items-end gap-2 sm:gap-1 sm:min-w-[120px]">
                                <p className="font-medium text-base sm:text-lg whitespace-nowrap order-2 sm:order-1">
                                  EGP {(item.price * item.quantity).toFixed(2)}
                                </p>
                                {item.quantity > 1 && (
                                  <p className="text-xs text-gray-500 order-1 sm:order-2">
                                    EGP {item.price.toFixed(2)} each
                                  </p>
                                )}
                              </div>
                            </div>
                            <div className="text-gray-500 text-xs sm:text-sm mt-2 sm:mt-1.5 flex flex-wrap items-center gap-2">
                              <div className="inline-flex items-center gap-1.5 bg-gray-100/80 px-2 py-1 rounded-md">
                                <span className="font-medium text-gray-600">
                                  Size:
                                </span>
                                <span className="text-gray-700">
                                  {item.selectedSize}
                                </span>
                              </div>
                              <div className="inline-flex items-center gap-1.5 bg-gray-100/80 px-2 py-1 rounded-md">
                                <span className="font-medium text-gray-600">
                                  Color:
                                </span>
                                <span className="text-gray-700">
                                  {item.selectedColor}
                                </span>
                              </div>
                              <div className="inline-flex items-center gap-1.5 bg-gray-100/80 px-2 py-1 rounded-md">
                                <span className="font-medium text-gray-600">
                                  Qty:
                                </span>
                                <span className="text-gray-700">
                                  {item.quantity}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="border-t pt-4 space-y-3">
                      <div className="flex flex-col sm:flex-row justify-between gap-1 sm:items-center">
                        <span className="text-gray-600 text-sm sm:text-base">
                          Subtotal ({items.length}{" "}
                          {items.length === 1 ? "item" : "items"})
                        </span>
                        <span className="font-medium text-base sm:text-lg">
                          EGP {total.toFixed(2)}
                        </span>
                      </div>
                      {paymentMethod === "vodafone_cash" && (
                        <div className="flex flex-col sm:flex-row justify-between gap-1 sm:items-center">
                          <span className="text-green-600 text-sm sm:text-base">
                            Vodafone Cash Discount (5%)
                          </span>
                          <span className="font-medium text-green-600 text-base sm:text-lg">
                            - EGP {(total * 0.05).toFixed(2)}
                          </span>
                        </div>
                      )}
                      <div className="flex flex-col sm:flex-row justify-between gap-1 sm:items-center">
                        <span className="text-gray-600 text-sm sm:text-base">
                          Shipping
                        </span>
                        <span className="font-medium text-green-600 text-base sm:text-lg">
                          Free
                        </span>
                      </div>
                      <div className="flex flex-col sm:flex-row justify-between gap-2 sm:items-center text-base sm:text-lg font-bold pt-3 border-t">
                        <span>Total Amount</span>
                        <div className="text-right">
                          <span className="text-lg sm:text-xl md:text-2xl block sm:inline">
                            EGP{" "}
                            {paymentMethod === "vodafone_cash"
                              ? (total * 0.95).toFixed(2)
                              : total.toFixed(2)}
                          </span>
                          <p className="text-xs text-gray-500 font-normal mt-0.5 sm:mt-1">
                            Including VAT
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <div className="mb-6 sm:mb-8">
            <h2 className="text-lg font-semibold mb-4">Payment Method</h2>
            <RadioGroup
              value={paymentMethod}
              onValueChange={setPaymentMethod}
              className="grid grid-cols-1 gap-4"
            >
              {[
                {
                  value: "vodafone_cash",
                  icon: <VodafoneCashIcon />,
                  title: "Vodafone Cash",
                  description: (
                    <div className="flex flex-col">
                      <span className="text-red-500">
                        Pay via Vodafone Cash and get 5% off
                        {/* - Send to:{" "}
                        <a
                          href={`https://wa.me/00201025387499?text=${encodeURIComponent(
                            getVodafoneCashText()
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline font-medium"
                          onClick={(e) => e.stopPropagation()}
                        >
                          01025387499
                        </a> */}
                      </span>
                      {/* <span className="text-red-500 mt-0.5">
                        (Don't forget to Send screenshot after checkout)
                      </span> */}
                    </div>
                  ),
                },
                {
                  value: "cash_on_delivery",
                  icon: <Banknote className="w-6 h-6 text-green-600" />,
                  title: "Cash on Delivery",
                  description: "Pay when you receive",
                },
              ].map((method) => (
                <label
                  key={method.value}
                  className={`relative flex items-start p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    paymentMethod === method.value
                      ? "border-blue-500 bg-blue-50/50"
                      : "border-gray-200 hover:bg-gray-50 hover:border-blue-400"
                  }`}
                >
                  <RadioGroupItem
                    value={method.value}
                    id={method.value}
                    className="sr-only"
                  />
                  <div className="flex items-center gap-3 w-full">
                    <div
                      className={`w-5 h-5 mt-0.5 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${
                        paymentMethod === method.value
                          ? "border-blue-500"
                          : "border-gray-400"
                      }`}
                    >
                      {paymentMethod === method.value && (
                        <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                      )}
                    </div>
                    <div className="flex items-start gap-3 flex-1">
                      {method.icon}
                      <div className="flex flex-col">
                        <span className="font-medium text-base">
                          {method.title}
                        </span>
                        <span className="text-gray-500 text-sm mt-1">
                          {method.description}
                        </span>
                      </div>
                    </div>
                  </div>
                </label>
              ))}
            </RadioGroup>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 sm:space-y-6"
          >
            <div className="grid grid-cols-1 gap-4 sm:gap-6">
              <div className="space-y-1 sm:space-y-2">
                <Input
                  placeholder="Receiver Name"
                  {...register("receiver")}
                  className={`p-4 sm:p-6 rounded-lg text-sm sm:text-base ${
                    errors.receiver ? "border-red-500" : ""
                  }`}
                />
                {errors.receiver && (
                  <p className="text-red-500 text-sm">
                    {errors.receiver.message}
                  </p>
                )}
              </div>

              <div className="space-y-1 sm:space-y-2">
                <Input
                  placeholder="Phone Number"
                  {...register("phone1")}
                  className={`p-4 sm:p-6 rounded-lg text-sm sm:text-base ${
                    errors.phone1 ? "border-red-500" : ""
                  }`}
                />
                {errors.phone1 && (
                  <p className="text-red-500 text-sm">
                    {errors.phone1.message}
                  </p>
                )}
              </div>

              <div className="space-y-1 sm:space-y-2">
                <Input
                  placeholder="Alternative Phone Number (Optional)"
                  {...register("phone2")}
                  className={`p-4 sm:p-6 rounded-lg text-sm sm:text-base ${
                    errors.phone2 ? "border-red-500" : ""
                  }`}
                />
                {errors.phone2 && (
                  <p className="text-red-500 text-sm">
                    {errors.phone2.message}
                  </p>
                )}
              </div>

              <div className="space-y-1 sm:space-y-2">
                <Select
                  onValueChange={(value) => {
                    const selectedGov = governments.find(
                      (gov) => gov.name === value
                    );
                    if (selectedGov) {
                      setSelectedGovernment(value);
                      setSelectedGovernmentId(selectedGov.id);
                      setValue("government", value);
                    }
                  }}
                >
                  <SelectTrigger
                    className={`p-4 sm:p-6 rounded-lg text-sm sm:text-base ${
                      errors.government ? "border-red-500" : ""
                    }`}
                  >
                    <SelectValue placeholder="Select Government" />
                  </SelectTrigger>
                  <SelectContent>
                    {governments?.map((gov) => (
                      <SelectItem key={gov.id} value={gov.name}>
                        {gov.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.government && (
                  <p className="text-red-500 text-sm">
                    {errors.government.message}
                  </p>
                )}
              </div>

              <div className="space-y-1 sm:space-y-2">
                <Select
                  onValueChange={(value) => setValue("area", value)}
                  disabled={!selectedGovernment}
                >
                  <SelectTrigger
                    className={`p-4 sm:p-6 rounded-lg text-sm sm:text-base ${
                      errors.area ? "border-red-500" : ""
                    }`}
                  >
                    <SelectValue placeholder="Select Area" />
                  </SelectTrigger>
                  <SelectContent>
                    {areas?.map((area) => (
                      <SelectItem key={area.id} value={area.name}>
                        {area.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.area && (
                  <p className="text-red-500 text-sm">{errors.area.message}</p>
                )}
              </div>

              <div className="space-y-1 sm:space-y-2">
                <Textarea
                  placeholder="Detailed Address"
                  {...register("address")}
                  className={`p-4 sm:p-6 rounded-lg text-sm sm:text-base min-h-[100px] ${
                    errors.address ? "border-red-500" : ""
                  }`}
                />
                {errors.address && (
                  <p className="text-red-500 text-sm">
                    {errors.address.message}
                  </p>
                )}
              </div>

              <div className="space-y-1 sm:space-y-2">
                <Textarea
                  placeholder="Order Notes (Optional)"
                  {...register("notes")}
                  className="p-4 sm:p-6 rounded-lg text-sm sm:text-base min-h-[100px]"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-black hover:bg-black/80 text-white py-4 sm:py-6 rounded-lg text-base sm:text-lg font-semibold transition-colors"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                  <span className="text-sm sm:text-base">Processing...</span>
                </div>
              ) : (
                "Complete Order"
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
