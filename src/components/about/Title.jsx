import Image from "next/image";
import React from "react";

function Title() {
  return (
    <section className="about-us-title">
      <div className="container d-flex justify-content-center">
        <Image
          src="/assets/images/about/about-image.png"
          alt="About image"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "80%", height: "auto" }}
        />
      </div>
    </section>
  );
}

export default Title;
