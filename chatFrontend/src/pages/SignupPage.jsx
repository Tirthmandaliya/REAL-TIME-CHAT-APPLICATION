import { useState } from 'react';
import useAuthStore from '../store/useAuthStore';
import { Link } from 'react-router-dom';
import { EyeOff, Loader2, MessageSquare, User , Mail, Eye,Lock} from 'lucide-react';
import AuthImagePattern from '../components/AuthImagePattern';
import toast from 'react-hot-toast';

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp } = useAuthStore();

  const handleChange = (e) => {
    setFormData({...formData,[e.target.name]:e.target.value});
  }

  const validatForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is requried");
    if (!formData.email.trim()) return toast.error("Email is requried");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is requried");
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");

    return true;
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const success = validatForm();

    if(success === true) signup(formData); 
  };

  return (
    <>
      <div className='min-h-screen grid lg:grid-cols-2'>
        {/* left side */}
        <div className="flex flex-col justify-center items-center p-6 sm:p-12">
          <div className='w-full max-w-md space-y-8'>
            {/* LOGO */}
            <div className='text-center mb-8'>
              <div className='flex flex-col gap-2 items-center group'>
                <div className='size-12 rounded-b-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors'>
                  <MessageSquare className='size-6 text-primary' />
                </div>
                <h1 className='text-2xl font-bold mt-2'>Create Account</h1>
                <p className='text-base-content/60'>Get Started with your Free Account</p>
              </div>
            </div>
            <form action="" onSubmit={handleSubmit}  className='space-y-6'>
              <div className='form-control'>
                <label className='lable'>
                  <span className='label-text font-medium'>Full Name</span>
                </label>
                <div className='relative'>
                  <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                    <User className='size-5 text-base-content/40' />
                  </div>
                  <input
                    type='text'
                    name='fullName'
                    className='input input-border w-full pl-10'
                    placeholder='Enter Full Name'
                    value={formData.fullName}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className='form-control'>
                <label className='lable'>
                  <span className='label-text font-medium'>Email</span>
                </label>
                <div className='relative'>
                  <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                    <Mail className='size-5 text-base-content/40' />
                  </div>
                  <input
                    type='email'
                    name='email'
                    className='input input-border w-full pl-10'
                    placeholder='Enter Email'
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className='form-control'>
                <label className='lable'>
                  <span className='label-text font-medium'>Password</span>
                </label>
                <div className='relative'>
                  <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                    <Lock className='size-5 text-base-content/40' />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name='password'
                    className='input input-border w-full pl-10'
                    placeholder='........'
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <button>
                    {showPassword ? (
                      <EyeOff className="size-5 text-base-content/40"/>
                    ) : (
                      <Eye className="size-5 text-base-content/40"/>
                    )
                    }
                  </button>
                </div>
              </div>
              <button type='submit' className='btn btn-primary w-full' disabled={isSigningUp}>
                { isSigningUp ? (
                  <>
                  <Loader2 className='size-5 animate-spin' />
                  Loading...
                  </>
                ) : (
                  "create Account"
                )
                }
              </button>
            </form>

            <div className='text-center'>
              <p>
                Already have an Account?{" "}
                <Link to="/login" className="link link-primary">
                  Sign in
                </Link> 
              </p>
            </div>
          </div>
        </div>
        {/* right side */}
        <AuthImagePattern 
          title="Join our community"
          subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
        />
      </div>
    </>
  )
}

export default SignupPage