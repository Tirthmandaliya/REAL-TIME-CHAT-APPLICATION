import { useState } from 'react'
import useAuthStore from '../store/useAuthStore';
import { Link } from 'react-router-dom';
import { MessageSquare, Mail,Lock,Eye, EyeOff, Loader2 } from 'lucide-react'

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
  }

   const handleChange = (e) => {
    setFormData({...formData,[e.target.name]:e.target.value});
   } 
  return (
    <div className='h-screen grid lg:grid-cols-2'>
      {/* left side - form */}
      <div className='flex flex-col justify-center items-center p-6 sl:p-12'>
        <div className='w-full max-w-md space-y-8'>
          {/* LOGO */}
          <div className='text-center mb-8'>
            <div className='flex flex-col gap-2 items-center group'>
              <div className='w-12 h-12 rouneded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors'>
                <MessageSquare className='w-6 h-6 text-primary' />
              </div>
              <h1 className='text-2xl font-bold mt-2'>Welcome Back</h1>
              <p className='text-base-content/60'>Sign in your account</p>
            </div>
          </div>

          {/* form */}
          <form onSubmit={handleSubmit} className='space-y-6'>
            <div className='form-control'>
              <label className='lable'>
                <span className='lable-text font-medium'>Email</span>
              </label>
              <div className='relative'>
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className='h-5 w-5 text-base-content' />
                </div>
                <input
                  type='email'
                  name='email'
                  className={`input input-borderd w-full pl-10`}
                  placeholder='you@example.com'
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className='form-control'>
              <label className='lable'>
                <span className='lable-text font-medium'>Password</span>
              </label>
              <div className='relative'>
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className='h-5 w-5 text-base-content' />
                </div>
                <input
                  type={showPassword ? "text" : "password" }
                  name='password'
                  className={`input input-borderd w-full pl-10`}
                  placeholder='......'
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type='button'
                  className='absolute inset-y-0 right-0 pr-3 flex items-center'
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className='h-5 w-5 text-base-content/40'/>
                  ) : (
                    <Eye className="h-5 w-5 text-base-content/40" />
                  ) }
                </button>
              </div>
            </div>

            <button type='submit' className='btn btn-primary w-full' disabled={isLoggingIn}>
              {isLoggingIn ? (
                <>
                  <Loader2 className='h-5 w-5 animate-spin'/>
                  Loading...
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          <div className='text-center'>
            <p className='text-base-content/60'>
              Don&apos;t have an account?{" "}
              <Link to={"/signup"} className='link link-primary'>
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage