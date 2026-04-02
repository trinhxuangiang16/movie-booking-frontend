// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogDescription,
// } from "@/components/ui/dialog";
// import { ChartTopHot } from "./ChartTopHot";
// import { THotMovie } from "../types/typeHotMovie";

// export default function ModalTopHot({
//   open,
//   setOpen,
//   activeMovie,
// }: {
//   open: boolean;
//   setOpen: (open: boolean) => void;
//   activeMovie: THotMovie | null;
// }) {
//   return (
//     <div className="relative w-full">
//       <Dialog open={open} onOpenChange={setOpen}>
//         <DialogContent className="w-full text-transparent bg-transparent">
//           <DialogTitle></DialogTitle>
//           <DialogHeader>
//             <DialogDescription>
//               <ChartTopHot activeMovie={activeMovie} />
//             </DialogDescription>
//           </DialogHeader>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }
