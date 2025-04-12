import { FacebookProvider, CustomChat } from "react-facebook";

const FacebookMessage = () => {
  return (
    <FacebookProvider appId={process.env.FACEBOOK_APP_ID ?? ""} chatSupport>
      <CustomChat
        pageId={process.env.FACEBOOK_PAGE_ID ?? ""}
        minimized={false}
      />
    </FacebookProvider>
  );
};

export default FacebookMessage;
