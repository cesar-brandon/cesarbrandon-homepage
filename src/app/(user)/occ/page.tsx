import { PickingUpOrder } from "@/components/occ/picking-up-order";
import SmoothScrollCards from "@/components/occ/smooth-scroll-cards";

export default function OCCPage() {
  return (
    <div className="w-[30rem] h-[20rem] rounded border flex items-center justify-center m-auto mt-40 overflow-hidden">
      {/* <PickingUpOrder /> */}
      <SmoothScrollCards />
    </div>
  );
}
