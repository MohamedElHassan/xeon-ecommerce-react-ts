import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup } from "@/components/ui/radio-group";

interface ICheckoutPageProps {};

const schema = z.object({
  receiver: z.string().nonempty("Receiver name is required"),
  phone1: z.string().nonempty("Phone number is required"),
  phone2: z.string().optional(),
  government: z.string().nonempty("Government is required"),
  area: z.string().nonempty("Area is required"),
  address: z.string().nonempty("Address is required"),
  notes: z.string().optional(),
  order_summary: z.string().nonempty("Order summary is required"),
});

const CheckoutPage: FC<ICheckoutPageProps> = (props) => {
  const [paymentMethod, setPaymentMethod] = useState("vodafone_cash");
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: any) => {
    try {
      const response = await axios.post("/api/checkout", {
        ...data,
        paymentMethod,
      });
      console.log("Order submitted successfully:", response.data);
    } catch (error) {
      console.log("Order submission error:", error);
    }
  };

  return (
    <div className="flex justify-center items-center py-5 px-2">
      <div className="text-center flex justify-center items-center flex-col gap-5 font-archivo">
        <h1 className="text-7xl md:text-6xl sm:text-5xl font-bold">Checkout</h1>
        <RadioGroup
          value={paymentMethod}
          onChange={setPaymentMethod}
          className="flex gap-4"
        >
          <RadioGroup.Option value="vodafone_cash">Vodafone Cash</RadioGroup.Option>
          <RadioGroup.Option value="cash_on_delivery">Cash on Delivery</RadioGroup.Option>
        </RadioGroup>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Input
            placeholder="Receiver Name"
            {...register("receiver")}
            className="p-6"
          />
          {errors.receiver && <span>{errors.receiver.message}</span>}
          <Input
            placeholder="Phone Number 1"
            {...register("phone1")}
            className="p-6"
          />
          {errors.phone1 && <span>{errors.phone1.message}</span>}
          <Input
            placeholder="Phone Number 2"
            {...register("phone2")}
            className="p-6"
          />
          <Input
            placeholder="Government"
            {...register("government")}
            className="p-6"
          />
          {errors.government && <span>{errors.government.message}</span>}
          <Input
            placeholder="Area"
            {...register("area")}
            className="p-6"
          />
          {errors.area && <span>{errors.area.message}</span>}
          <Input
            placeholder="Address"
            {...register("address")}
            className="p-6"
          />
          {errors.address && <span>{errors.address.message}</span>}
          <Input
            placeholder="Notes"
            {...register("notes")}
            className="p-6"
          />
          <Input
            placeholder="Order Summary"
            {...register("order_summary")}
            className="p-6"
          />
          {errors.order_summary && <span>{errors.order_summary.message}</span>}
          <Button
            type="submit"
            className="py-6 px-24 text-xl hover:scale-105 transition-transform duration-300"
          >
            Submit Order
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
