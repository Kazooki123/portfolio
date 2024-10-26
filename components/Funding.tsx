'use client'

import React, { useState, useEffect } from 'react'
import Countdown from 'react-countdown'
import Confetti from 'react-confetti'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

interface CountdownRenderProps {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    completed: boolean;
}

export default function Funding() {
  const [windowSize, setWindowSize] = useState<{
    width: number;
    height: number;
  }>({ width: 0, height: 0 });
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const birthday = new Date(2026, 8, 1)

  const renderer = ({
    days,
    hours,
    minutes,
    seconds,
    completed,
  }: CountdownRenderProps) => {
    if (completed) {
      if (!showConfetti) setShowConfetti(true);
      return (
        <span className="text-4xl font-bold text-primary">Happy Birthday!</span>
      );
    } else {
      return (
        <span className="text-4xl font-bold">
          {days}d {hours}h {minutes}m {seconds}s
        </span>
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/20 to-background p-8">
      {showConfetti && <Confetti width={windowSize.width} height={windowSize.height} />}
      <div className="max-w-2xl mx-auto space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Fund Me 👨🏼‍💻</CardTitle>
            <CardDescription>Timer celebration!</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center space-y-2">
              <h2 className="text-xl font-semibold">Countdown to My 18th Birthday!</h2>
              <Countdown date={birthday} renderer={renderer} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="amount">Donation Amount</Label>
              <Input id="amount" placeholder="Enter amount" type="number" min="1" step="1" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message (optional)</Label>
              <Input id="message" placeholder="Leave a birthday message" />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Donate</Button>
          </CardFooter>
        </Card>

        <Card className="opacity-50 pointer-events-none">
          <CardHeader>
            <CardTitle>Checkout</CardTitle>
            <CardDescription>This section is currently unavailable</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name on Card</Label>
              <Input id="name" placeholder="John Doe" disabled />
            </div>
            <div className="space-y-2">
              <Label htmlFor="card">Card Number</Label>
              <Input id="card" placeholder="1234 5678 9012 3456" disabled />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiry">Expiry Date</Label>
                <Input id="expiry" placeholder="MM/YY" disabled />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvc">CVC</Label>
                <Input id="cvc" placeholder="123" disabled />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" disabled>Pay Now</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
