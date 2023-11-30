import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { motion } from 'framer-motion'
import { Fingerprint, LockKeyhole, WalletCards } from 'lucide-react'
import arrowCurved from '@/assets/img/arrow-curved.svg'
import arrowStraight from '@/assets/img/arrow-straight.svg'
import { Separator } from '@/components/ui/separator'
import { buttonVariants } from '@/components/ui/button'
import { NavLink } from 'react-router-dom'

const arrowSvg = (
  <svg
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
    stroke="url('#myGradient')"
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <defs>
      <linearGradient id='myGradient' gradientUnits='userSpaceOnUse'>
        <stop stopColor='#fbbf24' offset='0%' />
        <stop stopColor='#f87171' offset='100%' />
      </linearGradient>
    </defs>
    <path d='M5 12h14' />
    <path d='m12 5 7 7-7 7' />
  </svg>
)

export const VaultyHome = () => {
  return (
    <div className='w-full max-h-[calc(100dvh-53px)] md:max-h-[100dvh] overflow-y-auto py-5 px-4'>
      <motion.div
        animate={{ y: [-100, 0] }}
        transition={{
          delay: 0.2,
          duration: 1,
          type: 'spring',
          damping: 6,
          stiffness: 50,
          restDelta: 0.001,
        }}
      >
        <h1 className='text-2xl font-semibold'>
          vaulty
          <span className='bg-gradient-to-r from-red-400 to-amber-400 text-transparent bg-clip-text'>
            .
          </span>
        </h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.7,
          delay: 0.6,
          ease: 'easeInOut',
        }}
      >
        <h2 className='mt-12 lg:mt-24 text-2xl md:text-4xl font-bold text-center [text-wrap:balance] px-4'>
          Store all your&nbsp;
          <span className='px-0.5 rounded-[2px] bg-gradient-to-r from-red-400 to-amber-400 dark:text-black [text-wrap:balance]'>
            information
          </span>
          <br className='hidden sm:block' />
          &nbsp;in one safe place
        </h2>

        <div className='p-4 hidden lg:grid grid-cols-1 lg:grid-cols-3 gap-4 lg:max-w-5xl mx-auto w-full z-10 relative'>
          <div className='flex justify-end mr-10'>
            <img
              src={arrowCurved}
              alt='arrow image'
              width='100px'
              height='100px'
              className='-scale-x-100'
            />
          </div>
          <div className='flex justify-center'>
            <img
              src={arrowStraight}
              alt='arrow image'
              width='100px'
              height='100px'
              className=''
            />
          </div>
          <div className='flex justify-start ml-10'>
            <img
              src={arrowCurved}
              alt='arrow image'
              width='100px'
              height='100px'
              className=''
            />
          </div>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 sm:max-w-lg md:max-w-2xl lg:max-w-5xl w-full sm:px-4 mx-auto mt-12 lg:-mt-8'>
          <div className='h-full'>
            <Card className='w-full h-full flex flex-col justify-between'>
              <div>
                <CardHeader>
                  <CardTitle className='flex items-center justify-between mb-1'>
                    <span className='text-xl md:text-2xl'>Connections</span>
                    <LockKeyhole strokeWidth={1.8} />
                  </CardTitle>
                  <Separator />
                </CardHeader>

                <CardContent className='text-muted-foreground pr-12'>
                  Store your existing connections here, create new ones or
                  generate different types of passwords.
                </CardContent>
              </div>

              <CardFooter className='flex justify-end pb-4'>
                <NavLink
                  to='/connection'
                  className={buttonVariants({
                    variant: 'outline',
                    size: 'icon',
                  })}
                >
                  {arrowSvg}
                </NavLink>
              </CardFooter>
            </Card>
          </div>

          <div className='h-full'>
            <Card className='w-full h-full flex flex-col justify-between'>
              <div>
                <CardHeader>
                  <CardTitle className='flex items-center justify-between mb-1'>
                    <span className='text-xl md:text-2xl'>Wallet</span>
                    <WalletCards strokeWidth={1.8} />
                  </CardTitle>
                  <Separator />
                </CardHeader>

                <CardContent className='text-muted-foreground pr-12'>
                  Save time on your next purchase by storing your credit cards
                  here, you can also set a default card for payement forms.
                </CardContent>
              </div>

              <CardFooter className='flex justify-end pb-4'>
                <NavLink
                  to='/wallet'
                  className={buttonVariants({
                    variant: 'outline',
                    size: 'icon',
                  })}
                >
                  {arrowSvg}
                </NavLink>
              </CardFooter>
            </Card>
          </div>

          <div className='h-full'>
            <Card className='w-full h-full flex flex-col justify-between'>
              <div>
                <CardHeader>
                  <CardTitle className='flex items-center justify-between mb-1'>
                    <span className='text-xl md:text-2xl'>Identities</span>
                    <Fingerprint strokeWidth={1.8} size={22} />
                  </CardTitle>
                  <Separator />
                </CardHeader>
                <CardContent className='text-muted-foreground pr-12'>
                  Store your personal, professional or family identity here to
                  save time when filling out contact forms.
                </CardContent>
              </div>

              <CardFooter className='flex justify-end items-end pb-4'>
                <NavLink
                  to='/identity'
                  className={buttonVariants({
                    variant: 'outline',
                    size: 'icon',
                  })}
                >
                  {arrowSvg}
                </NavLink>
              </CardFooter>
            </Card>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
