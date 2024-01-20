import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  XIcon,
} from "react-share";

export default function SocialShare({ id }) {
  const shareUrl = "http://img.shre.in/s/" + id;
  // const shareUrl = "https://7qldqlnh-5173.inc1.devtunnels.ms/s/" + id;
  const title = "Stumbled upon a captivating image on Pixa-IMG—remarkably beautiful and 100% royalty-free for commercial use. Excited to incorporate this gem into projects with confidence! #PixaIMG : ";

  return (
    <div className="inline-flex gap-1 p-2">
      <FacebookShareButton
        url={shareUrl}
        className="Demo__some-network__share-button"
      >
        <FacebookIcon size={28} round />
      </FacebookShareButton>
      <TwitterShareButton
        url={shareUrl}
        title={title}
        className="Demo__some-network__share-button"
      >
        <XIcon size={28} round />
      </TwitterShareButton>
      <TelegramShareButton
        url={shareUrl}
        title={title}
        className="Demo__some-network__share-button"
      >
        <TelegramIcon size={28} round />
      </TelegramShareButton>
      <WhatsappShareButton
        url={shareUrl}
        title={title}
        separator=":: "
        className="Demo__some-network__share-button"
      >
        <WhatsappIcon size={28} round />
      </WhatsappShareButton>
      <LinkedinShareButton
        url={shareUrl}
        className="Demo__some-network__share-button"
      >
        <LinkedinIcon size={28} round />
      </LinkedinShareButton>
      <EmailShareButton
        url={shareUrl}
        subject={title}
        body="body"
        className="Demo__some-network__share-button"
      >
        <EmailIcon size={28} round />
      </EmailShareButton>
    </div>
  );
}
