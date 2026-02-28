import { ZapIcon } from "lucide-react";

const RateLimitedUI = () => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="max-w-md w-full bg-base-100 border border-primary/30 shadow-lg rounded-xl p-8 text-center">

        <div className="flex justify-center mb-4">
          <div className="bg-primary/20 p-4 rounded-full">
            <ZapIcon className="size-10 text-primary" />
          </div>
        </div>

        <h3 className="text-2xl font-bold mb-2">
          Rate Limit Reached
        </h3>

        <p className="text-base-content/80 mb-4">
          You've made too many requests in a short period.
        </p>

        <p className="text-sm text-base-content/60">
          Please wait for 5 seconds before trying again.
        </p>

      </div>
    </div>
  );
};

export default RateLimitedUI;