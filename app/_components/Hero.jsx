import React from 'react'

const Hero = () => {
  return (
    <div>
        <section className="bg-gray-50">
  <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen">
    <div className="mx-auto max-w-xl text-center">
      <h1 className="text-3xl font-extrabold sm:text-5xl">
        Create your Form
        <strong className="font-extrabold text-black-700 sm:block"> In seconds not hours </strong>
      </h1>

      <p className="mt-4 sm:text-xl/relaxed">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt illo tenetur fuga ducimus
        numquam ea!
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <a
          className="block w-full rounded bg-black px-12 py-3 text-sm font-medium text-white shadow focus:outline-none focus:ring sm:w-auto"
          href="#"
        >
            + Create AI Form
        </a>

        <a
          className="block w-full rounded px-12 py-3 text-sm font-medium text-black shadow focus:outline-none focus:ring sm:w-auto"
          href="#"
        >
          Learn More
        </a>
      </div>
    </div>
  </div>
</section>
    </div>
  )
}

export default Hero