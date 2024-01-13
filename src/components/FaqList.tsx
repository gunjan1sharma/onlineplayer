import FaqComponent from "./FaqComponent";

function FaqList(props: any) {
  return (
    <div className="p-4 mt-20 lg:mx-20">
      <h1>FAQ (How it works)</h1>
      <div
        className="mt-3 mb-3"
        style={{ borderBottomWidth: "1px", borderBottomColor: "lightgray" }}
      />
      <FaqComponent
        faq="What websites and platforms are supported?"
        answer="We play videos from YouTube, Facebook, Instagram, Twitter, Vimeo, Dailymotion, and most other major social media and video hosting platforms. We also support direct playback of MP4, MP3, M3U8, WebM, and more"
      />
      <FaqComponent
        faq="Is it legal to watch videos from all these sources?"
        answer="We only support watching publicly available videos. Please follow the terms of service of the original video platforms and respect copyright laws."
      />
      <FaqComponent
        faq="Do I need to download anything to watch videos?"
        answer="No! Our website is completely browser-based. Simply drop a URL or upload your file and watch directly in your browser."
      />
      <FaqComponent
        faq="Is there any quality loss compared to watching directly on the original platform?"
        answer="We strive to deliver the highest quality possible. However, some platforms might offer higher bitrates or resolutions on their own domains."
      />
      <FaqComponent
        faq="Is there a limit on how long I can watch videos?"
        answer="No, you can watch videos for as long as you like!"
      />
      <FaqComponent
        faq="Is your website mobile-friendly?"
        answer="Absolutely! Our website is fully responsive and optimized for all devices, including phones and tablets."
      />
    </div>
  );
}

export default FaqList;
