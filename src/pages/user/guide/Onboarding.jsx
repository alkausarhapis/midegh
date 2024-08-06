import React from "react";

const Onboarding = () => {
  return (
    <div>
      <section className="container flex items-center justify-center w-1/2 mt-4">
        <div className="relative flex flex-col items-center justify-center">
          <div className="flex items-center justify-center text-xl font-bold text-center text-white rounded-full w-14 h-14 bg-primary">
            1
          </div>
          <div className="absolute mt-24 font-medium text-center text-primary">
            Essential information
          </div>
        </div>

        <div className="flex-auto border-t-4 border-tertiary"></div>

        <div className="relative flex flex-col items-center justify-center">
          <div className="flex items-center justify-center text-xl font-bold text-center text-white rounded-full w-14 h-14 bg-tertiary">
            2
          </div>
          <div className="absolute mt-20 font-medium text-center whitespace-nowrap text-tertiary">
            Write blog
          </div>
        </div>

        <div className="flex-auto border-t-4 border-tertiary"></div>

        <div className="relative flex flex-col items-center justify-center">
          <div className="flex items-center justify-center text-xl font-bold text-center text-white rounded-full w-14 h-14 bg-tertiary">
            3
          </div>
          <div className="absolute mt-20 font-medium text-center whitespace-nowrap text-tertiary">
            Publish
          </div>
        </div>
      </section>

      <section>
        <form action=""></form>
      </section>
    </div>
  );
};

export default Onboarding;
