# Reset Password UI Update

## Route Information
- **Route**: `/forgot-password/reset_password`
- **Component**: `src/app/(auth)/forgot-password/reset_password.tsx`
- **Feature**: Authentication → Forgot Password → Reset Password
- **Date**: Current

## Issue
- Inputs and submit button had minimal styling (border-bottom only), inconsistent with app’s UI.
- No disabled/loading state on submit, unclear feedback during request.

## Changes Implemented

### 1) Inputs Restyled
- Full-width inputs with border, rounded corners, focus ring, and transitions.
- Proper invalid state (red border) and accessible descriptions.

```tsx
<input
  id="password"
  className={`w-full px-4 py-2 border ${errors.password ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-primaryColor/20 focus:border-primaryColor transition-colors`}
  type="password"
  placeholder="Enter new password"
  disabled={isSubmitting}
  {...register("password")}
/>
```

### 2) Submit Button Updated
- Full-width primary button, rounded, with hover/disabled variants.
- Shows spinner and text "Updating..." while submitting.

```tsx
<button
  type="submit"
  disabled={isSubmitting}
  className={`w-full h-10 rounded-lg flex items-center justify-center transition-colors ${isSubmitting ? "bg-gray-400 cursor-not-allowed text-white" : "bg-primaryColor text-white hover:bg-primaryColor/90"}`}
>
  {isSubmitting ? (/* spinner */ "Updating...") : "Update Password"}
</button>
```

## UX Improvements
- Consistent visuals with signup form styling.
- Clear feedback during submission.
- Better accessibility with labels and aria attributes.

## Files Touched
- `src/app/(auth)/forgot-password/reset_password.tsx`

## Follow-ups (Optional)
- Add password visibility toggle (eye icon) like the signup page.
- Align zod password rules across auth forms.
