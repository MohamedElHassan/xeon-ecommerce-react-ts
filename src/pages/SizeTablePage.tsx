import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type SizeData = {
  size: string;
  chest: string;
  length: string;
  sleeve: string;
};

const sizeData: SizeData[] = [
  { size: "M", chest: '60"', length: '72"', sleeve: '50-70"' },
  { size: "L", chest: '62"', length: '74"', sleeve: '70-90"' },
  { size: "XL", chest: '64"', length: '76"', sleeve: '90-110"' },
  { size: "2XL", chest: '66"', length: '77"', sleeve: '110-130"' },
];

export default function HoodieSizesTable() {
  return (
    <div className="flex justify-center items-center py-5 px-2 flex-col">
      <div className="text-center flex justify-center items-center flex-col gap-5 font-archivo mb-4">
        <h1 className="text-7xl md:text-6xl sm:text-5xl font-bold">
          Size Table
        </h1>
        <p className="font-extralight text-base max-w-xl">
          Here you can check the size of your Hobbie to fit exactly your body.😁
        </p>
      </div>
      {/* Content Here */}
      <Card className="w-full max-w-4xl mx-auto font-archivo">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Hoodie Size Table
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Size</TableHead>
                  <TableHead>Chest</TableHead>
                  <TableHead>Length</TableHead>
                  <TableHead>Sleeve</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sizeData.map((item) => (
                  <TableRow
                    key={item.size}
                    className="hover:bg-muted/50 transition-colors"
                  >
                    <TableCell className="font-medium">
                      {item.size === "M" ? (
                        <Badge
                          variant="default"
                          className="text-sm font-semibold"
                        >
                          {item.size}
                        </Badge>
                      ) : (
                        item.size
                      )}
                    </TableCell>
                    <TableCell>{item.chest}</TableCell>
                    <TableCell>{item.length}</TableCell>
                    <TableCell>{item.sleeve}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <p className="text-sm text-muted-foreground mt-4 text-center">
            Measurements are in cm, weight is in kg. Size M is our most popular
            size.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
