import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X, CreditCard, Shield, Zap } from "lucide-react";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPaymentComplete: () => void;
}

export default function PaymentModal({ isOpen, onClose, onPaymentComplete }: PaymentModalProps) {
  if (!isOpen) return null;

  const handlePayment = async () => {
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    onPaymentComplete();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-4">
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl flex items-center gap-2">
              💳 Complete Payment
            </CardTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="text-center space-y-4">
            <div className="bg-primary/10 text-primary p-6 rounded-2xl">
              <h3 className="text-2xl font-bold">$1.00</h3>
              <p className="text-sm opacity-80">One-time payment</p>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-semibold">What you'll get:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-accent" />
                  AI-powered breed recommendation
                </li>
                <li className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-green-500" />
                  Detailed breed profile & care tips
                </li>
                <li className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-blue-500" />
                  Instant results
                </li>
              </ul>
            </div>
          </div>

          <div className="space-y-4">
            <Button 
              variant="hero" 
              size="lg" 
              onClick={handlePayment}
              className="w-full"
            >
              <CreditCard className="w-4 h-4" />
              Pay $1 & Get My Match
            </Button>
            
            <div className="text-center">
              <p className="text-xs text-muted-foreground">
                🔒 Secure payment powered by Stripe
              </p>
            </div>
          </div>

          <div className="bg-muted/50 p-4 rounded-lg">
            <p className="text-xs text-muted-foreground text-center">
              <strong>Note:</strong> This is a demo app. In production, this would integrate with Supabase 
              and Stripe for real payment processing. For now, clicking "Pay" will simulate a successful payment.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}