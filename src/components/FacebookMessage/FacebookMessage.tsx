import { FacebookProvider, CustomChat } from "react-facebook";

const FacebookMessage = () => {
  return (
    <FacebookProvider appId={"9596771340430426"} chatSupport>
      <CustomChat pageId={"587185991150484"} minimized={true} />
    </FacebookProvider>
  );
};

export default FacebookMessage;
