import Link from "next/link";

const Banner = () => {
  return (
    <div className="bg-primary h-[90vh] flex justify-center items-center flex-col">
      <div className="max-w-[1240px] px-5 mx-auto">
        <div className="text-content text-center">
          <h1 className="text-primary text-5xl font-bold">
            Manage Your Task With Ease With <br /> Next Todo
          </h1>
        </div>

        {/* Banner CTA */}
        <div className="cta flex justify-center items-center mt-5">
          <Link
            href="/dashboard"
            className="text-white bg-btn-primary-bg rounded px-4 py-2 font-bold"
          >
            Explore
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
