import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
//23/12/24

//22/01/25
//23/03/25
//22/04/25

export function AlertDialogCustom() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div className="w-fit bg-primaryColor px-3 py-1 rounded shadow-lg shadow-black  text-white">
          <button>Enroll</button>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Log In First.</AlertDialogTitle>
          <AlertDialogDescription>
            You need to login or sign up first in order to enroll to any
            package.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Login</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
