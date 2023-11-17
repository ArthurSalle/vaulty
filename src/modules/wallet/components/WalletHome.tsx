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
      </div>
    </div>
  )
}
