import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Input,
    Checkbox,
    Button,
  } from "@material-tailwind/react";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import GoogleLoginButton from "../Components/GoogleLoginButton";
   

  export function LoginCard() {

    const navigate = useNavigate(); 
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleFrom = async(e)=>{

      e.preventDefault()

      const data = { email, password };

      try{
        const response = await fetch('http://localhost:5000/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });

        const responseData = await response.json();

        if (response.status === 200) {
          localStorage.setItem('token', responseData.token);
          console.log('Stored Token:', responseData.token);
          // Redirect to login page after successful registration
          navigate('/');
        } else if (response.status === 400) {
          setError(responseData.message);
          // Handle showing an error message to the user in the UI
        } else if (response.status === 500) {
          setError('Internal server error');
          // Handle showing an error message to the user in the UI
        }
      }

      catch (error) {
        console.error('Error registering user:', error);
        // Handle showing an error message to the user in the UI
        setError('Internal server error');
      }

  }
      

    return (
      <Card className="w-80 sm:w-96 mx-auto my-20 shadow-xl bg-slate-100">
        <CardHeader
          variant="gradient"
          color="gray"
          className="mb-4 grid h-28 place-items-center"
        >
          <Typography variant="h3" color="white">
            Sign In
          </Typography>
        </CardHeader>
        <CardBody className="flex flex-col gap-4">
         <form action="" method="POST" onSubmit={handleFrom}>
         <Input required type="email" value={email} onChange={(e)=>setEmail(e.target.value)} id="email" label="Email" size="lg" />
         <Input required type="password" value={password} onChange={(e)=>setPassword(e.target.value)} id="password" label="Password" size="lg" />
         <Button type="submit" variant="gradient" fullWidth className="mt-3">
            Sign In
          </Button>
         </form>
          <div className="-ml-2.5">
            <Checkbox label="Remember Me" />
          </div>
          {error && <Typography color="red">{error}</Typography>}
        </CardBody>
        <CardFooter className="pt-0">
          <Typography variant="small" className=" flex justify-center">
            Don&apos;t have an account?
            <Typography
              as="a"
              href="/register"
              variant="small"
              color="blue-gray"
              className="ml-1 font-bold"
            >
              Sign up
            </Typography>
          </Typography>
        </CardFooter>
        <GoogleLoginButton/>
      </Card>
    );
  }