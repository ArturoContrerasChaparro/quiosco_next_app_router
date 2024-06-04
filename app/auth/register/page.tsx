"use client"
import { useForm } from "react-hook-form"
import Logo from "@/components/ui/Logo"
import Link from "next/link"
import { ReactNode } from "react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/navigation"

export default function RegisterPage() {

  const { register, handleSubmit, formState: { errors } } = useForm()
  const router = useRouter()

  const onSubmit = handleSubmit(async (data) => {

    if (data.password !== data.confirmPassword) {
      toast.error('Las contraseñas no coinciden');
      return;
    }

    const res = await fetch("/auth/api/register", {
      method: 'POST',
      body: JSON.stringify({ 
          nombre: data.nombre,
          apellido: data.apellido,
          telefono: data.telefono,
          username: data.username,
          email: data.email,
          password: data.password

       }),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (res.ok) {
      router.push('/order/cafe')
    }
    
  })

  return (
    <>
    <ToastContainer/>
    <div className="min-h-screen grid md:grid-cols-2 items-center justify-center bg-gray-100 py-6">
      <div className="flex items-center justify-center p-6">
        <form onSubmit={onSubmit} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
          <h1 className="text-2xl font-bold mb-6 text-amber-500">Registrar</h1>

          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre:</label>
          <input
            type="text"
            {...register("nombre", {
              required: {
                value: true,
                message: 'El nombre es requerido'
              }
            })}
            className={`${!errors.nombre ? 'mb-6' : 'mb-0'} mt-1 mb-6 p-2 w-full border border-gray-300 rounded-md`}
            placeholder="Pedro"
          />
          {errors.nombre && (
            <span className="text-red-500 text-sm">
              {errors.nombre.message as ReactNode}
            </span>
          )}

          <label htmlFor="apellido" className="block text-sm font-medium text-gray-700">Apellido:</label>
          <input
            type="text"
            {...register("apellido", {
              required: {
                value: true,
                message: 'El apellido es requerido'
              }
            })}
            className={`${!errors.apellido ? 'mb-6' : 'mb-0'} mt-1 mb-6 p-2 w-full border border-gray-300 rounded-md`}
            placeholder="Torres"
          />
          {errors.apellido && (
            <span className="text-red-500 text-sm">
              {errors.apellido.message as ReactNode}
            </span>
          )}

          <label htmlFor="tel" className="block text-sm font-medium text-gray-700">Teléfono:</label>
          <input
            type="text"
            {...register("telefono", {
              required: {
                value: true,
                message: 'El número es requerido'
              }
            })}
            className={`${!errors.telefono ? 'mb-6' : 'mb-0'} mt-1 mb-6 p-2 w-full border border-gray-300 rounded-md`}
            placeholder="6394560012"
          />
          {errors.telefono && (
            <span className="text-red-500 text-sm">
              {errors.telefono.message as ReactNode}
            </span>
          )}

          <label htmlFor="usuario" className="block text-sm font-medium text-gray-700">Usuario:</label>
          <input
            type="text"
            {...register("username", {
              required: {
                value: true,
                message: 'El usuario es requerido'
              }
            })}
            className={`${!errors.username ? 'mb-6' : 'mb-0'} mt-1 mb-6 p-2 w-full border border-gray-300 rounded-md`}
            placeholder="Pedro_45"
          />
          {errors.username && (
            <span className="text-red-500 text-sm">
              {errors.username.message as ReactNode}
            </span>
          )}

          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
          <input
            type="email"
            {...register("email", {
              required: {
                value: true,
                message: 'El email es requerido'
              }
            })}
            className={`${!errors.email ? 'mb-6' : 'mb-0'} mt-1 mb-6 p-2 w-full border border-gray-300 rounded-md`}
            placeholder="Pedro26_Torres@####.com"
          />
          {errors.email && (
            <span className="text-red-500 text-sm">
              {errors.email.message as ReactNode}
            </span>
          )}

          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña:</label>
          <input
            type="password"
            {...register("password", {
              required: {
                value: true,
                message: 'La contraseña es requerida'
              }
            })}
            className={`${!errors.password ? 'mb-6' : 'mb-0'} mt-1 mb-6 p-2 w-full border border-gray-300 rounded-md`}
            placeholder="******"
          />
          {errors.password && (
            <span className="text-red-500 text-sm">
              {errors.password.message as ReactNode}
            </span>
          )}

          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirmar contraseña:</label>
          <input
            type="password"
            {...register("confirmPassword", {
              required: {
                value: true,
                message: 'Confirma tu contraseña'
              }
            })}
            className={`${!errors.confirmPassword ? 'mb-6' : 'mb-0'} mt-1 mb-6 p-2 w-full border border-gray-300 rounded-md`}
            placeholder="******"
          />
          {errors.confirmPassword && (
            <span className="text-red-500 text-sm">
              {errors.confirmPassword.message as ReactNode}
            </span>
          )}

          <button className="w-full py-2 px-4 bg-amber-500 text-white font-semibold rounded-md hover:bg-amber-600 transition duration-200">
            Aceptar y Continuar
          </button>
        </form>
      </div>

      <div className="hidden md:flex flex-col items-center justify-center bg-gradient-to-r from-amber-500 to-amber-600 h-full text-white p-8 rounded-lg">
        <h1 className="text-4xl font-bold mb-6">¡BIENVENIDO A:</h1>
        <Logo />
        <h2 className="text-lg font-semibold mb-4">¿Ya tienes una cuenta?</h2>
        <Link href={"/auth/login"}
          className="text-sm text-blue-900 hover:text-blue-300 underline transition duration-300 ease-in-out">
          Inicia sesión aquí
        </Link>
      </div>
    </div>
    </>
  )
}