import Image from "next/image";

const AppTitle = () => {
  return (
    <div className="bg-[#0D0D0D] w-full flex justify-center items-center h-50">
      <Image
        src={"/logo.svg"}
        alt="Todo App"
        width={226}
        height={48}
        unoptimized
      />
    </div>
  );
};

export default AppTitle;
