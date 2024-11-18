import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Mail, Lock, User, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GetAuthState } from "@/store/AuthState";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSignin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = await axios.post("/signin", { email, password });
      if (user.data.error) {
        setLoading(false);
        toast.error(user.data.error);
      } else {
        setLoading(false);
        toast.success("Logged in successfully");
        GetAuthState(dispatch);
        navigate("/products");
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
      toast.error("Something went wrong");
    }
  };

  const handleGoogleSignup = () => {
    window.location.href = "http://localhost:8000/login/federated/google";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 to-white flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-3xl font-bold text-center text-green-700">
            LogIn to NxtGen
          </CardTitle>
          <CardDescription className="text-center text-green-600">
            Sign in to start shopping fresh, organic groceries
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            className="w-full bg-white hover:bg-gray-100 text-gray-900 border border-gray-300"
            onClick={handleGoogleSignup}
          >
            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
              <path d="M1 1h22v22H1z" fill="none" />
            </svg>
            Continue with Google
          </Button>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-green-600">
                Or continue with
              </span>
            </div>
          </div>
          <form onSubmit={handleSignin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-green-700">
                Email
              </Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 border-green-300 focus:border-green-500 focus:ring-green-500"
                  required
                />
                <Mail className="absolute left-3 top-2.5 h-5 w-5 text-green-400" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-green-700">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type="password"
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 border-green-300 focus:border-green-500 focus:ring-green-500"
                  required
                />
                <Lock className="absolute left-3 top-2.5 h-5 w-5 text-green-400" />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-green-500 hover:bg-green-600 text-white"
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Sign In
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-green-700">
            New to NxtGen?{" "}
            <Link
              to={"/signup"}
              className="text-green-600 font-semibold hover:underline"
            >
              {" "}
              Create an Account
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};