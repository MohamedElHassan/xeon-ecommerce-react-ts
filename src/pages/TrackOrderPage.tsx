import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { orderService } from "@/api";

type Props = {};

interface ApiResponse {
  success: number;
  result: {
    code: string;
    bar_code: string;
    status: string;
    returned_inventory_status: string;
    return_reason: string | null;
    delay_reason: string;
    branch: string;
    branch_number1: string;
    branch_number2: string;
    captain: string;
    captain_number1: string;
    captain_number2: string;
    received_amount: number;
    expected_branch: string;
  };
}

const TrackOrderPage = (props: Props) => {
  const [orderStatus, setOrderStatus] = useState<ApiResponse | null>(null);
  const [orderCode, setOrderCode] = useState("24810057");

  const getOrderStatus = async () => {
    try {
      const data = await orderService.getOrderStatus(orderCode);
      console.log(data.result);
      setOrderStatus(data);
    } catch (error) {
      console.log("getOrderStatus Error: ", error);
    }
  };

  return (
    <div className="flex justify-center items-center py-5 px-2">
      <div className="text-center flex justify-center items-center flex-col gap-5 font-archivo">
        <h1 className="text-7xl md:text-6xl sm:text-5xl font-bold">Track Your Order</h1>
        <p className="font-extralight text-base max-w-xl">
          Welcome to our tracking page! Here you can easily track the status
          of your order by simply entering the tracking number we provided in
          your confirmation email. Stay up-to-date with the latest information
          on your delivery and ensure a hassle-free experience. Thank you for
          choosing our services! If you have any questions don't hesitate to
          contact us.
        </p>
        <Input
          className="p-6"
          onChange={(e) => setOrderCode(e.target.value)}
          placeholder="Enter your order code here"
          type="text"
        />
        <Button
          className="py-6 px-24 text-xl hover:bg-black/80 transition-transform duration-300"
          onClick={getOrderStatus}
        >
          Get Order Status
        </Button>
      </div>
    </div>
  );
};

export default TrackOrderPage;
