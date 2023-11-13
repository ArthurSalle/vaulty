// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// import arrowCurved from '../../../assets/img/arrow-curved.svg'
// import arrowStraight from '../../../assets/img/arrow-straight.svg'
// import { List, PenSquare, Plus } from 'lucide-react'

export const WalletHome = () => {
  return (
    <div className='w-full'>
      <h1 className='text-2xl font-semibold p-4'>
        vaulty
        <span className='bg-gradient-to-r from-red-400 to-amber-400 text-transparent bg-clip-text'>
          .
        </span>
      </h1>

      <div className='bg-white w-full flex flex-col px-8 py-4 mt-8 lg:mt-14 justify-center items-center xl:max-w-4xl mx-auto'>
        <h2 className='text-4xl font-bold leading-tight pb-8 lg:pb-4 lg:pt-8 text-center [text-wrap:balance]'>
          Store all your&nbsp;
          <span className='px-2 rounded-[2px] bg-gradient-to-r from-red-400 to-amber-400'>
            credit cards
          </span>
          &nbsp;in one safe place
        </h2>

        <h2 className='text-3xl font-bold leading-tight pb-8 lg:pb-4 lg:pt-8 text-center [text-wrap:balance] mt-12'>
          Coming soon! 🚀
        </h2>

        {/* <div className='hidden lg:grid grid-cols-1 lg:grid-cols-3 gap-4 w-full z-10'>
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

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 max-lg:max-w-md lg:w-full lg:-m-4'>
          <div className='flex flex-col justify-center h-full'>
            <Card className='w-full h-full'>
              <CardHeader>
                <CardTitle className='flex items-center justify-between'>
                  <span>Browse</span>
                  <List strokeWidth={2.5} />
                </CardTitle>
              </CardHeader>
              <CardContent className='text-muted-foreground'>
                In the list you'll find all your identities. Distinguish them by
                the coloured circles
              </CardContent>
            </Card>
          </div>
          <div className='flex flex-col justify-center h-full'>
            <Card className='w-full h-full'>
              <CardHeader>
                <CardTitle className='flex items-center justify-between'>
                  <span>Create</span>
                  <Plus strokeWidth={2.5} />
                </CardTitle>
              </CardHeader>
              <CardContent className='text-muted-foreground'>
                Create your most frequently used identities, whether personal,
                professional or those of your family members.
              </CardContent>
            </Card>
          </div>
          <div className='flex flex-col justify-center h-full'>
            <Card className='w-full h-full'>
              <CardHeader>
                <CardTitle className='flex items-center justify-between'>
                  <span>Edit</span>
                  <PenSquare strokeWidth={2.5} size={22} />
                </CardTitle>
              </CardHeader>
              <CardContent className='text-muted-foreground'>
                Edit, update, delete them or set a default identity.
              </CardContent>
            </Card>
          </div>
        </div> */}
      </div>
    </div>
  )
}
