import Image from "next/image";

export default function Page() {
  return (
    <div className="container">
      <h1>Hello, Next.js!</h1>
      <Image
        src="https://upload.wikimedia.org/wikipedia/commons/8/88/Audi_RS4_Avant_grey_Free_Car_Picture_-_Give_Credit_Via_Link_%28cropped%29.jpg"
        alt="Example Image"
        width={500}
        height={500}
      />
    </div>
  );
}
