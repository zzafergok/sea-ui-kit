var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};

// src/styles/theme.ts
var seaBlueTheme = {
  colors: {
    // Primary sea blues
    primary50: "hsl(200, 100%, 95%)",
    primary100: "hsl(200, 100%, 90%)",
    primary200: "hsl(200, 95%, 80%)",
    primary300: "hsl(200, 90%, 70%)",
    primary400: "hsl(200, 85%, 60%)",
    primary500: "hsl(200, 80%, 50%)",
    // Main sea blue
    primary600: "hsl(200, 85%, 40%)",
    primary700: "hsl(200, 90%, 30%)",
    primary800: "hsl(200, 95%, 20%)",
    primary900: "hsl(200, 100%, 10%)",
    // Complementary colors
    accent50: "hsl(180, 100%, 95%)",
    accent100: "hsl(180, 100%, 90%)",
    accent200: "hsl(180, 95%, 80%)",
    accent300: "hsl(180, 90%, 70%)",
    accent400: "hsl(180, 85%, 60%)",
    accent500: "hsl(180, 80%, 50%)",
    // Teal accent
    accent600: "hsl(180, 85%, 40%)",
    accent700: "hsl(180, 90%, 30%)",
    accent800: "hsl(180, 95%, 20%)",
    accent900: "hsl(180, 100%, 10%)",
    // Neutrals
    neutral50: "hsl(200, 10%, 98%)",
    neutral100: "hsl(200, 10%, 95%)",
    neutral200: "hsl(200, 10%, 90%)",
    neutral300: "hsl(200, 10%, 80%)",
    neutral400: "hsl(200, 10%, 70%)",
    neutral500: "hsl(200, 10%, 50%)",
    neutral600: "hsl(200, 10%, 40%)",
    neutral700: "hsl(200, 10%, 30%)",
    neutral800: "hsl(200, 10%, 20%)",
    neutral900: "hsl(200, 10%, 10%)",
    // Semantic colors
    success: "hsl(160, 80%, 45%)",
    warning: "hsl(40, 90%, 50%)",
    error: "hsl(350, 80%, 55%)",
    info: "hsl(220, 80%, 55%)"
  },
  // Dark mode adjustments
  dark: {
    primary500: "hsl(200, 70%, 45%)",
    accent500: "hsl(180, 70%, 45%)",
    background: "hsl(200, 20%, 10%)",
    foreground: "hsl(200, 10%, 95%)"
  },
  // Light mode
  light: {
    background: "hsl(200, 10%, 98%)",
    foreground: "hsl(200, 20%, 10%)"
  },
  // Font sizes
  fontSize: {
    xs: "0.75rem",
    sm: "0.875rem",
    base: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
    "4xl": "2.25rem",
    "5xl": "3rem"
  },
  // Font weights
  fontWeight: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700
  },
  // Border radius
  radius: {
    sm: "0.125rem",
    md: "0.25rem",
    lg: "0.5rem",
    xl: "1rem",
    full: "9999px"
  },
  // Spacing
  spacing: {
    0: "0",
    1: "0.25rem",
    2: "0.5rem",
    3: "0.75rem",
    4: "1rem",
    5: "1.25rem",
    6: "1.5rem",
    8: "2rem",
    10: "2.5rem",
    12: "3rem",
    16: "4rem",
    20: "5rem",
    24: "6rem",
    32: "8rem",
    40: "10rem",
    48: "12rem",
    56: "14rem",
    64: "16rem"
  },
  // Shadow
  shadow: {
    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
  },
  // Animation
  animation: {
    fast: "0.15s ease-in-out",
    default: "0.25s ease-in-out",
    slow: "0.4s ease-in-out"
  }
};

// src/components/Tabs/Tabs.tsx
import React from "react";
import * as RadixTabs from "@radix-ui/react-tabs";

// src/lib/utils.ts
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
function debounce(fn, ms = 300) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
}
function isDarkMode() {
  if (typeof window === "undefined")
    return false;
  return localStorage.getItem("theme") === "dark" || !localStorage.getItem("theme") && window.matchMedia("(prefers-color-scheme: dark)").matches;
}
function get(obj, path, defaultValue = void 0) {
  const travel = (regexp) => String.prototype.split.call(path, regexp).filter(Boolean).reduce(
    (res, key) => res !== null && res !== void 0 ? res[key] : res,
    obj
  );
  const result = travel(/[,[\]]+?/) || travel(/[,.[\]]+?/);
  return result === void 0 || result === obj ? defaultValue : result;
}
function sanitizeHtml(html) {
  return html.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}
function formatDate(date, locale = "en-US") {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}
var storage = {
  get: (key, defaultValue) => {
    if (typeof window === "undefined")
      return defaultValue;
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error("Error getting item from localStorage", error);
      return defaultValue;
    }
  },
  set: (key, value) => {
    if (typeof window === "undefined")
      return;
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Error setting item in localStorage", error);
    }
  },
  remove: (key) => {
    if (typeof window === "undefined")
      return;
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.error("Error removing item from localStorage", error);
    }
  }
};

// src/components/Tabs/Tabs.tsx
var Tabs = RadixTabs.Root;
var TabsList = React.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ React.createElement(
    RadixTabs.List,
    __spreadValues({
      ref,
      className: cn(
        "inline-flex h-10 items-center justify-center rounded-md bg-neutral-100 p-1 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400",
        className
      )
    }, props)
  );
});
TabsList.displayName = RadixTabs.List.displayName;
var TabsTrigger = React.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ React.createElement(
    RadixTabs.Trigger,
    __spreadValues({
      ref,
      className: cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-white data-[state=active]:text-primary-700 data-[state=active]:shadow-sm dark:ring-offset-neutral-950 dark:focus-visible:ring-primary-600 dark:data-[state=active]:bg-neutral-950 dark:data-[state=active]:text-primary-500",
        className
      )
    }, props)
  );
});
TabsTrigger.displayName = RadixTabs.Trigger.displayName;
var TabsContent = React.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ React.createElement(
    RadixTabs.Content,
    __spreadValues({
      ref,
      className: cn(
        "mt-2 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 dark:ring-offset-neutral-950 dark:focus-visible:ring-primary-600",
        className
      )
    }, props)
  );
});
TabsContent.displayName = RadixTabs.Content.displayName;

// src/components/Form/Form.tsx
import React2 from "react";
import {
  Controller,
  FormProvider,
  useFormContext
} from "react-hook-form";
var Form = (_a) => {
  var _b = _a, {
    children,
    className,
    form,
    onSubmit
  } = _b, htmlFormProps = __objRest(_b, [
    "children",
    "className",
    "form",
    "onSubmit"
  ]);
  return /* @__PURE__ */ React2.createElement(FormProvider, __spreadValues({}, form), /* @__PURE__ */ React2.createElement(
    "form",
    __spreadValues({
      className: cn("space-y-6", className),
      onSubmit: form.handleSubmit(onSubmit)
    }, htmlFormProps),
    children
  ));
};
var FormFieldContext = React2.createContext(
  {}
);
var FormField = (_a) => {
  var props = __objRest(_a, []);
  return /* @__PURE__ */ React2.createElement(FormFieldContext.Provider, { value: { name: props.name } }, /* @__PURE__ */ React2.createElement(Controller, __spreadValues({}, props)));
};
var useFormField = () => {
  const fieldContext = React2.useContext(FormFieldContext);
  const itemContext = React2.useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();
  const fieldState = getFieldState(fieldContext.name, formState);
  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }
  const { id } = itemContext;
  return __spreadValues({
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`
  }, fieldState);
};
var FormItemContext = React2.createContext(
  {}
);
var FormItem = React2.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  const id = React2.useId();
  return /* @__PURE__ */ React2.createElement(FormItemContext.Provider, { value: { id } }, /* @__PURE__ */ React2.createElement("div", __spreadValues({ ref, className: cn("space-y-2", className) }, props)));
});
FormItem.displayName = "FormItem";
var FormLabel = React2.forwardRef((_a, ref) => {
  var _b = _a, { className, required, children } = _b, props = __objRest(_b, ["className", "required", "children"]);
  const { formItemId } = useFormField();
  return /* @__PURE__ */ React2.createElement(
    "label",
    __spreadValues({
      ref,
      className: cn(
        "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        className
      ),
      htmlFor: formItemId
    }, props),
    children,
    required && /* @__PURE__ */ React2.createElement("span", { className: "text-error ml-1" }, "*")
  );
});
FormLabel.displayName = "FormLabel";
var FormDescription = React2.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  const { formDescriptionId } = useFormField();
  return /* @__PURE__ */ React2.createElement(
    "p",
    __spreadValues({
      ref,
      id: formDescriptionId,
      className: cn(
        "text-xs text-neutral-500 dark:text-neutral-400",
        className
      )
    }, props)
  );
});
FormDescription.displayName = "FormDescription";
var FormMessage = React2.forwardRef((_a, ref) => {
  var _b = _a, { className, children } = _b, props = __objRest(_b, ["className", "children"]);
  const { error, formMessageId } = useFormField();
  const body = error ? String(error == null ? void 0 : error.message) : children;
  if (!body) {
    return null;
  }
  return /* @__PURE__ */ React2.createElement(
    "p",
    __spreadValues({
      ref,
      id: formMessageId,
      className: cn(
        "text-xs font-medium text-error dark:text-error",
        className
      )
    }, props),
    body
  );
});
FormMessage.displayName = "FormMessage";

// src/components/Toast/Toast.tsx
import React3 from "react";
import { X } from "lucide-react";
import * as RadixToast from "@radix-ui/react-toast";
var ToastProvider = RadixToast.Provider;
var ToastViewport = React3.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ React3.createElement(
    RadixToast.Viewport,
    __spreadValues({
      ref,
      className: cn(
        "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
        className
      )
    }, props)
  );
});
ToastViewport.displayName = RadixToast.Viewport.displayName;
var Toast = React3.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ React3.createElement(
    RadixToast.Root,
    __spreadValues({
      ref,
      className: cn(
        "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border border-neutral-200 p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full bg-white dark:border-neutral-800 dark:bg-neutral-950",
        className
      )
    }, props)
  );
});
Toast.displayName = RadixToast.Root.displayName;
var ToastAction = React3.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ React3.createElement(
    RadixToast.Action,
    __spreadValues({
      ref,
      className: cn(
        "inline-flex h-8 shrink-0 items-center justify-center rounded-md border border-neutral-200 bg-transparent px-3 text-sm font-medium ring-offset-white transition-colors hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-800 dark:ring-offset-neutral-950 dark:hover:bg-neutral-800 dark:focus:ring-primary-600",
        className
      )
    }, props)
  );
});
ToastAction.displayName = RadixToast.Action.displayName;
var ToastClose = React3.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ React3.createElement(
    RadixToast.Close,
    __spreadValues({
      ref,
      className: cn(
        "absolute right-2 top-2 rounded-md p-1 text-neutral-500 opacity-0 transition-opacity hover:text-neutral-900 focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 dark:text-neutral-400 dark:hover:text-neutral-50",
        className
      ),
      "toast-close": ""
    }, props),
    /* @__PURE__ */ React3.createElement(X, { className: "h-4 w-4" })
  );
});
ToastClose.displayName = RadixToast.Close.displayName;
var ToastTitle = React3.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ React3.createElement(
    RadixToast.Title,
    __spreadValues({
      ref,
      className: cn("text-sm font-semibold", className)
    }, props)
  );
});
ToastTitle.displayName = RadixToast.Title.displayName;
var ToastDescription = React3.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ React3.createElement(
    RadixToast.Description,
    __spreadValues({
      ref,
      className: cn("text-sm opacity-90", className)
    }, props)
  );
});
ToastDescription.displayName = RadixToast.Description.displayName;

// src/components/Dialog/Dialog.tsx
import React4 from "react";
import { X as X2 } from "lucide-react";
import * as RadixDialog from "@radix-ui/react-dialog";
var Dialog = RadixDialog.Root;
var DialogTrigger = RadixDialog.Trigger;
var DialogPortal = (_a) => {
  var _b = _a, {
    className,
    children
  } = _b, props = __objRest(_b, [
    "className",
    "children"
  ]);
  return /* @__PURE__ */ React4.createElement(RadixDialog.Portal, __spreadValues({}, props), /* @__PURE__ */ React4.createElement(
    "div",
    {
      className: cn(
        "fixed inset-0 z-50 flex items-start justify-center sm:items-center",
        className
      )
    },
    children
  ));
};
DialogPortal.displayName = RadixDialog.Portal.displayName;
var DialogOverlay = React4.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ React4.createElement(
    RadixDialog.Overlay,
    __spreadValues({
      ref,
      className: cn(
        "fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-all duration-100 data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=open]:fade-in",
        className
      )
    }, props)
  );
});
DialogOverlay.displayName = RadixDialog.Overlay.displayName;
var DialogContent = React4.forwardRef((_a, ref) => {
  var _b = _a, { className, children } = _b, props = __objRest(_b, ["className", "children"]);
  return /* @__PURE__ */ React4.createElement(DialogPortal, null, /* @__PURE__ */ React4.createElement(DialogOverlay, null), /* @__PURE__ */ React4.createElement(
    RadixDialog.Content,
    __spreadValues({
      ref,
      className: cn(
        "fixed z-50 grid w-full gap-4 rounded-lg border border-neutral-200 bg-white p-6 shadow-lg animate-in data-[state=open]:fade-in-90 data-[state=open]:slide-in-from-bottom-10 sm:max-w-lg sm:zoom-in-90 data-[state=open]:sm:slide-in-from-bottom-0",
        "dark:border-neutral-800 dark:bg-neutral-950",
        className
      )
    }, props),
    children,
    /* @__PURE__ */ React4.createElement(RadixDialog.Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-neutral-100 data-[state=open]:text-neutral-500 dark:ring-offset-neutral-950 dark:focus:ring-primary-600 dark:data-[state=open]:bg-neutral-800 dark:data-[state=open]:text-neutral-400" }, /* @__PURE__ */ React4.createElement(X2, { className: "h-4 w-4" }), /* @__PURE__ */ React4.createElement("span", { className: "sr-only" }, "Close"))
  ));
});
DialogContent.displayName = RadixDialog.Content.displayName;
var DialogHeader = (_a) => {
  var _b = _a, {
    className
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ React4.createElement(
    "div",
    __spreadValues({
      className: cn(
        "flex flex-col space-y-1.5 text-center sm:text-left",
        className
      )
    }, props)
  );
};
DialogHeader.displayName = "DialogHeader";
var DialogFooter = (_a) => {
  var _b = _a, {
    className
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ React4.createElement(
    "div",
    __spreadValues({
      className: cn(
        "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
        className
      )
    }, props)
  );
};
DialogFooter.displayName = "DialogFooter";
var DialogTitle = React4.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ React4.createElement(
    RadixDialog.Title,
    __spreadValues({
      ref,
      className: cn(
        "text-lg font-semibold leading-none tracking-tight text-neutral-900 dark:text-neutral-50",
        className
      )
    }, props)
  );
});
DialogTitle.displayName = RadixDialog.Title.displayName;
var DialogDescription = React4.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ React4.createElement(
    RadixDialog.Description,
    __spreadValues({
      ref,
      className: cn("text-sm text-neutral-500 dark:text-neutral-400", className)
    }, props)
  );
});
DialogDescription.displayName = RadixDialog.Description.displayName;

// src/components/Select/Select.tsx
import React5 from "react";
import * as RadixSelect from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
var Select = RadixSelect.Root;
var SelectGroup = RadixSelect.Group;
var SelectValue = RadixSelect.Value;
var SelectTrigger = React5.forwardRef((_a, ref) => {
  var _b = _a, { className, children } = _b, props = __objRest(_b, ["className", "children"]);
  return /* @__PURE__ */ React5.createElement(
    RadixSelect.Trigger,
    __spreadValues({
      ref,
      className: cn(
        "flex h-10 w-full items-center justify-between rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-50 dark:placeholder:text-neutral-400 dark:focus:ring-primary-600",
        className
      )
    }, props),
    children,
    /* @__PURE__ */ React5.createElement(RadixSelect.Icon, { asChild: true }, /* @__PURE__ */ React5.createElement(ChevronDown, { className: "h-4 w-4 opacity-50" }))
  );
});
SelectTrigger.displayName = RadixSelect.Trigger.displayName;
var SelectContent = React5.forwardRef((_a, ref) => {
  var _b = _a, { className, children, position = "popper" } = _b, props = __objRest(_b, ["className", "children", "position"]);
  return /* @__PURE__ */ React5.createElement(RadixSelect.Portal, null, /* @__PURE__ */ React5.createElement(
    RadixSelect.Content,
    __spreadValues({
      ref,
      className: cn(
        "relative z-50 min-w-[8rem] overflow-hidden rounded-md border border-neutral-200 bg-white text-neutral-900 shadow-md animate-in fade-in-80 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-50",
        position === "popper" && "translate-y-1",
        className
      ),
      position
    }, props),
    /* @__PURE__ */ React5.createElement(RadixSelect.ScrollUpButton, { className: "flex items-center justify-center h-6 bg-white text-neutral-600 cursor-default dark:bg-neutral-950 dark:text-neutral-400" }, /* @__PURE__ */ React5.createElement(ChevronUp, { className: "h-4 w-4" })),
    /* @__PURE__ */ React5.createElement(
      RadixSelect.Viewport,
      {
        className: cn(
          "p-1",
          position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
        )
      },
      children
    ),
    /* @__PURE__ */ React5.createElement(RadixSelect.ScrollDownButton, { className: "flex items-center justify-center h-6 bg-white text-neutral-600 cursor-default dark:bg-neutral-950 dark:text-neutral-400" }, /* @__PURE__ */ React5.createElement(ChevronDown, { className: "h-4 w-4" }))
  ));
});
SelectContent.displayName = RadixSelect.Content.displayName;
var SelectLabel = React5.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ React5.createElement(
    RadixSelect.Label,
    __spreadValues({
      ref,
      className: cn(
        "py-1.5 pl-8 pr-2 text-sm font-semibold text-neutral-900 dark:text-neutral-100",
        className
      )
    }, props)
  );
});
SelectLabel.displayName = RadixSelect.Label.displayName;
var SelectItem = React5.forwardRef((_a, ref) => {
  var _b = _a, { className, children } = _b, props = __objRest(_b, ["className", "children"]);
  return /* @__PURE__ */ React5.createElement(
    RadixSelect.Item,
    __spreadValues({
      ref,
      className: cn(
        "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 focus:bg-primary-100 focus:text-primary-800 dark:focus:bg-primary-800 dark:focus:text-primary-100",
        className
      )
    }, props),
    /* @__PURE__ */ React5.createElement("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center" }, /* @__PURE__ */ React5.createElement(RadixSelect.ItemIndicator, null, /* @__PURE__ */ React5.createElement(Check, { className: "h-4 w-4" }))),
    /* @__PURE__ */ React5.createElement(RadixSelect.ItemText, null, children)
  );
});
SelectItem.displayName = RadixSelect.Item.displayName;
var SelectSeparator = React5.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ React5.createElement(
    RadixSelect.Separator,
    __spreadValues({
      ref,
      className: cn(
        "-mx-1 my-1 h-px bg-neutral-100 dark:bg-neutral-800",
        className
      )
    }, props)
  );
});
SelectSeparator.displayName = RadixSelect.Separator.displayName;

// src/components/Input/Input.tsx
import React6 from "react";
var Input = React6.forwardRef(
  (_a, ref) => {
    var _b = _a, { className, type, error } = _b, props = __objRest(_b, ["className", "type", "error"]);
    return /* @__PURE__ */ React6.createElement("div", { className: "relative w-full" }, /* @__PURE__ */ React6.createElement(
      "input",
      __spreadValues({
        type,
        className: cn(
          "flex h-10 w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-50 dark:placeholder:text-neutral-400 dark:focus:ring-primary-600",
          error && "border-error focus:ring-error",
          className
        ),
        ref
      }, props)
    ), error && /* @__PURE__ */ React6.createElement("p", { className: "mt-1 text-xs text-error dark:text-error" }, error));
  }
);
Input.displayName = "Input";

// src/components/Switch/Switch.tsx
import React7 from "react";
import * as RadixSwitch from "@radix-ui/react-switch";
var Switch = React7.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ React7.createElement(
    RadixSwitch.Root,
    __spreadProps(__spreadValues({
      className: cn(
        "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary-500 data-[state=unchecked]:bg-neutral-200 dark:data-[state=unchecked]:bg-neutral-700 dark:focus-visible:ring-primary-600 dark:data-[state=checked]:bg-primary-600",
        className
      )
    }, props), {
      ref
    }),
    /* @__PURE__ */ React7.createElement(
      RadixSwitch.Thumb,
      {
        className: cn(
          "pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0 dark:bg-neutral-50"
        )
      }
    )
  );
});
Switch.displayName = RadixSwitch.Root.displayName;

// src/components/Textarea/Textarea.tsx
import React8 from "react";
var Textarea = React8.forwardRef(
  (_a, ref) => {
    var _b = _a, { className, error } = _b, props = __objRest(_b, ["className", "error"]);
    return /* @__PURE__ */ React8.createElement("div", { className: "relative w-full" }, /* @__PURE__ */ React8.createElement(
      "textarea",
      __spreadValues({
        className: cn(
          "flex min-h-[80px] w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-50 dark:placeholder:text-neutral-400 dark:focus:ring-primary-600",
          error && "border-error focus:ring-error",
          className
        ),
        ref
      }, props)
    ), error && /* @__PURE__ */ React8.createElement("p", { className: "mt-1 text-xs text-error dark:text-error" }, error));
  }
);
Textarea.displayName = "Textarea";

// src/components/Checkbox/Checkbox.tsx
import React9 from "react";
import { Check as Check2 } from "lucide-react";
import * as RadixCheckbox from "@radix-ui/react-checkbox";
var Checkbox = React9.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ React9.createElement(
    RadixCheckbox.Root,
    __spreadValues({
      ref,
      className: cn(
        "peer h-4 w-4 shrink-0 rounded-sm border border-neutral-200 focus:ring-primary-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-700 dark:focus:ring-primary-600 data-[state=checked]:bg-primary-500 data-[state=checked]:text-white dark:data-[state=checked]:bg-primary-600",
        className
      )
    }, props),
    /* @__PURE__ */ React9.createElement(RadixCheckbox.Indicator, { className: "flex items-center justify-center text-current" }, /* @__PURE__ */ React9.createElement(Check2, { className: "h-3 w-3" }))
  );
});
Checkbox.displayName = RadixCheckbox.Root.displayName;

// src/components/Button/Button.tsx
import React10, { forwardRef } from "react";
import { cva } from "class-variance-authority";
var buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default: "bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-700",
        secondary: "bg-accent-500 text-white hover:bg-accent-600 active:bg-accent-700",
        outline: "border border-primary-500 text-primary-500 hover:bg-primary-50 active:bg-primary-100",
        ghost: "text-primary-500 hover:bg-primary-50 active:bg-primary-100 hover:text-primary-600",
        link: "text-primary-500 underline-offset-4 hover:underline hover:text-primary-600",
        destructive: "bg-error text-white hover:bg-red-600 active:bg-red-700"
      },
      size: {
        sm: "h-8 px-3 text-xs",
        md: "h-10 px-4",
        lg: "h-12 px-6 text-lg",
        icon: "h-10 w-10"
      },
      fullWidth: {
        true: "w-full"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      fullWidth: false
    }
  }
);
var Button = forwardRef(
  (_a, ref) => {
    var _b = _a, {
      children,
      className,
      size = "md",
      asChild = false,
      disabled = false,
      fullWidth = false,
      variant = "default"
    } = _b, props = __objRest(_b, [
      "children",
      "className",
      "size",
      "asChild",
      "disabled",
      "fullWidth",
      "variant"
    ]);
    return /* @__PURE__ */ React10.createElement(
      "button",
      __spreadValues({
        ref,
        className: cn(buttonVariants({ variant, size, fullWidth, className }))
      }, props),
      children
    );
  }
);
Button.displayName = "Button";

// src/components/auth/LoginForm.tsx
import React11 from "react";
import { useTranslation as useTranslation2 } from "react-i18next";

// src/hooks/useForm.ts
import { z } from "zod";
import { useTranslation } from "react-i18next";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm as useReactHookForm } from "react-hook-form";
function useForm(schema, options) {
  const { t } = useTranslation();
  const resolver = zodResolver(schema, {
    errorMap: (issue, ctx) => {
      let message = issue.message;
      switch (issue.code) {
        case z.ZodIssueCode.invalid_type:
          if (issue.received === "undefined" || issue.received === "null") {
            message = t("validation.required");
          }
          break;
        case z.ZodIssueCode.too_small:
          if (issue.type === "string") {
            message = t("validation.minLength", { min: issue.minimum });
          }
          break;
        case z.ZodIssueCode.too_big:
          if (issue.type === "string") {
            message = t("validation.maxLength", { max: issue.maximum });
          }
          break;
        case z.ZodIssueCode.invalid_string:
          if (issue.validation === "email") {
            message = t("validation.email");
          } else {
            message = t("validation.invalidFormat");
          }
          break;
      }
      return { message: message != null ? message : ctx.defaultError };
    }
  });
  return useReactHookForm(__spreadValues({
    resolver
  }, options));
}

// src/lib/validations/auth.ts
import { z as z2 } from "zod";
var loginSchema = z2.object({
  email: z2.string().min(1, { message: "Email is required" }).email({ message: "Invalid email address" }),
  password: z2.string().min(1, { message: "Password is required" }).min(8, { message: "Password must be at least 8 characters" }),
  rememberMe: z2.boolean().optional()
});
var registerSchema = z2.object({
  name: z2.string().min(1, { message: "Name is required" }).min(2, { message: "Name must be at least 2 characters" }).max(50, { message: "Name must be less than 50 characters" }),
  email: z2.string().min(1, { message: "Email is required" }).email({ message: "Invalid email address" }),
  password: z2.string().min(1, { message: "Password is required" }).min(8, { message: "Password must be at least 8 characters" }).regex(/[A-Z]/, {
    message: "Password must contain at least one uppercase letter"
  }).regex(/[a-z]/, {
    message: "Password must contain at least one lowercase letter"
  }).regex(/[0-9]/, { message: "Password must contain at least one number" }),
  confirmPassword: z2.string().min(1, { message: "Confirm password is required" }),
  terms: z2.literal(true, {
    errorMap: () => ({ message: "You must accept the terms and conditions" })
  })
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"]
});
var forgotPasswordSchema = z2.object({
  email: z2.string().min(1, { message: "Email is required" }).email({ message: "Invalid email address" })
});
var resetPasswordSchema = z2.object({
  password: z2.string().min(1, { message: "Password is required" }).min(8, { message: "Password must be at least 8 characters" }).regex(/[A-Z]/, {
    message: "Password must contain at least one uppercase letter"
  }).regex(/[a-z]/, {
    message: "Password must contain at least one lowercase letter"
  }).regex(/[0-9]/, { message: "Password must contain at least one number" }),
  confirmPassword: z2.string().min(1, { message: "Confirm password is required" })
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"]
});

// src/components/auth/LoginForm.tsx
function LoginForm({ onSubmit, isLoading = false }) {
  const { t } = useTranslation2();
  const form = useForm(loginSchema, {
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false
    }
  });
  return /* @__PURE__ */ React11.createElement(Form, { form, onSubmit, className: "space-y-6" }, /* @__PURE__ */ React11.createElement(
    FormField,
    {
      control: form.control,
      name: "email",
      render: ({ field }) => /* @__PURE__ */ React11.createElement(FormItem, null, /* @__PURE__ */ React11.createElement(FormLabel, { required: true }, t("auth.email")), /* @__PURE__ */ React11.createElement(
        Input,
        __spreadValues({
          type: "email",
          placeholder: "email@example.com",
          disabled: isLoading
        }, field)
      ), /* @__PURE__ */ React11.createElement(FormMessage, null))
    }
  ), /* @__PURE__ */ React11.createElement(
    FormField,
    {
      control: form.control,
      name: "password",
      render: ({ field }) => /* @__PURE__ */ React11.createElement(FormItem, null, /* @__PURE__ */ React11.createElement(FormLabel, { required: true }, t("auth.password")), /* @__PURE__ */ React11.createElement(Input, __spreadValues({ type: "password", disabled: isLoading }, field)), /* @__PURE__ */ React11.createElement(FormMessage, null))
    }
  ), /* @__PURE__ */ React11.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ React11.createElement(
    FormField,
    {
      control: form.control,
      name: "rememberMe",
      render: ({ field }) => /* @__PURE__ */ React11.createElement("div", { className: "flex items-center space-x-2" }, /* @__PURE__ */ React11.createElement(
        Checkbox,
        {
          id: "rememberMe",
          checked: field.value,
          onCheckedChange: field.onChange,
          disabled: isLoading
        }
      ), /* @__PURE__ */ React11.createElement(
        "label",
        {
          htmlFor: "rememberMe",
          className: "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        },
        t("auth.rememberMe")
      ))
    }
  ), /* @__PURE__ */ React11.createElement(
    Button,
    {
      variant: "ghost",
      className: "px-0 text-sm",
      disabled: isLoading,
      type: "button"
    },
    t("auth.forgotPassword")
  )), /* @__PURE__ */ React11.createElement(Button, { type: "submit", fullWidth: true, disabled: isLoading, className: "mt-6" }, isLoading ? t("components.button.loadingText") : t("auth.login")));
}

// src/components/ThemeToggle/ThemeToggle.tsx
import React12 from "react";
import { Moon, Sun } from "lucide-react";
import { useTranslation as useTranslation3 } from "react-i18next";

// src/hooks/useTheme.ts
import { useEffect } from "react";

// src/store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";

// src/store/slices/langSlice.ts
import { createSlice } from "@reduxjs/toolkit";

// src/locales/index.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// src/locales/en/translation.json
var translation_default = {
  common: {
    loading: "Loading...",
    error: "An error occurred",
    success: "Success",
    cancel: "Cancel",
    save: "Save",
    edit: "Edit",
    delete: "Delete",
    search: "Search",
    filter: "Filter",
    noResults: "No results found"
  },
  auth: {
    login: "Login",
    logout: "Logout",
    register: "Register",
    forgotPassword: "Forgot Password",
    email: "Email",
    password: "Password",
    confirmPassword: "Confirm Password",
    username: "Username",
    rememberMe: "Remember Me"
  },
  navigation: {
    home: "Home",
    profile: "Profile",
    settings: "Settings",
    dashboard: "Dashboard",
    users: "Users",
    about: "About"
  },
  validation: {
    required: "This field is required",
    email: "Please enter a valid email address",
    minLength: "Must be at least {{min}} characters",
    maxLength: "Must be at most {{max}} characters",
    passwordMatch: "Passwords must match",
    invalidFormat: "Invalid format"
  },
  theme: {
    light: "Light",
    dark: "Dark",
    system: "System"
  },
  components: {
    button: {
      loadingText: "Please wait..."
    },
    dialog: {
      close: "Close"
    },
    datePicker: {
      placeholder: "Select date...",
      today: "Today"
    }
  }
};

// src/locales/tr/translation.json
var translation_default2 = {
  common: {
    loading: "Y\xFCkleniyor...",
    error: "Bir hata olu\u015Ftu",
    success: "Ba\u015Far\u0131l\u0131",
    cancel: "\u0130ptal",
    save: "Kaydet",
    edit: "D\xFCzenle",
    delete: "Sil",
    search: "Ara",
    filter: "Filtrele",
    noResults: "Sonu\xE7 bulunamad\u0131"
  },
  auth: {
    login: "Giri\u015F Yap",
    logout: "\xC7\u0131k\u0131\u015F Yap",
    register: "Kay\u0131t Ol",
    forgotPassword: "\u015Eifremi Unuttum",
    email: "E-posta",
    password: "\u015Eifre",
    confirmPassword: "\u015Eifre Tekrar",
    username: "Kullan\u0131c\u0131 Ad\u0131",
    rememberMe: "Beni Hat\u0131rla"
  },
  navigation: {
    home: "Ana Sayfa",
    profile: "Profil",
    settings: "Ayarlar",
    dashboard: "Kontrol Paneli",
    users: "Kullan\u0131c\u0131lar",
    about: "Hakk\u0131nda"
  },
  validation: {
    required: "Bu alan zorunludur",
    email: "L\xFCtfen ge\xE7erli bir e-posta adresi girin",
    minLength: "En az {{min}} karakter olmal\u0131d\u0131r",
    maxLength: "En fazla {{max}} karakter olmal\u0131d\u0131r",
    passwordMatch: "\u015Eifreler e\u015Fle\u015Fmelidir",
    invalidFormat: "Ge\xE7ersiz format"
  },
  theme: {
    light: "A\xE7\u0131k",
    dark: "Koyu",
    system: "Sistem"
  },
  components: {
    button: {
      loadingText: "L\xFCtfen bekleyin..."
    },
    dialog: {
      close: "Kapat"
    },
    datePicker: {
      placeholder: "Tarih se\xE7in...",
      today: "Bug\xFCn"
    }
  }
};

// src/locales/index.ts
var resources = {
  en: {
    translation: translation_default
  },
  tr: {
    translation: translation_default2
  }
};
i18n.use(LanguageDetector).use(initReactI18next).init({
  resources,
  fallbackLng: "en",
  debug: process.env.NODE_ENV === "development",
  interpolation: {
    escapeValue: false
    // React already escapes values
  },
  detection: {
    order: ["localStorage", "navigator"],
    lookupLocalStorage: "language"
  }
});
var locales_default = i18n;

// src/store/slices/langSlice.ts
var initialState = {
  currentLanguage: locales_default.language || "en",
  availableLanguages: ["en", "tr"]
};
var langSlice = createSlice({
  name: "lang",
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      const lang = action.payload;
      if (state.availableLanguages.includes(lang)) {
        state.currentLanguage = lang;
        locales_default.changeLanguage(lang);
        if (typeof window !== "undefined") {
          localStorage.setItem("language", lang);
        }
      }
    }
  }
});
var { setLanguage } = langSlice.actions;
var selectCurrentLanguage = (state) => {
  var _a;
  return (_a = state.lang) == null ? void 0 : _a.currentLanguage;
};
var selectAvailableLanguages = (state) => {
  var _a;
  return (_a = state.lang) == null ? void 0 : _a.availableLanguages;
};
var langSlice_default = langSlice.reducer;

// src/store/slices/userSlice.ts
import { createSlice as createSlice2 } from "@reduxjs/toolkit";
var initialState2 = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null
};
var userSlice = createSlice2({
  name: "user",
  initialState: initialState2,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    },
    logoutUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    }
  }
});
var { setUser, logoutUser, setLoading, setError } = userSlice.actions;
var selectUser = (state) => state.user.user;
var selectIsAuthenticated = (state) => state.user.isAuthenticated;
var selectIsLoading = (state) => state.user.isLoading;
var selectError = (state) => state.user.error;
var userSlice_default = userSlice.reducer;

// src/store/slices/themeSlice.ts
import { createSlice as createSlice3 } from "@reduxjs/toolkit";
var initialState3 = {
  mode: "system",
  systemPreference: isDarkMode() ? "dark" : "light"
};
var themeSlice = createSlice3({
  name: "theme",
  initialState: initialState3,
  reducers: {
    setTheme: (state, action) => {
      state.mode = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("theme", action.payload);
      }
    },
    updateSystemPreference: (state, action) => {
      state.systemPreference = action.payload;
    }
  }
});
var { setTheme, updateSystemPreference } = themeSlice.actions;
var selectTheme = (state) => state.theme.mode;
var selectEffectiveTheme = (state) => state.theme.mode === "system" ? state.theme.systemPreference : state.theme.mode;
var themeSlice_default = themeSlice.reducer;

// src/services/api/apiSlice.ts
import { createApi } from "@reduxjs/toolkit/query/react";

// src/services/api/axiosBaseQuery.ts
import axios from "axios";

// src/services/api/axiosInterceptors.ts
var setupAxiosInterceptors = (axiosInstance) => {
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      var _a, _b;
      const originalRequest = error.config;
      if (((_a = error.response) == null ? void 0 : _a.status) === 401 && originalRequest) {
        const refreshToken = typeof window !== "undefined" ? localStorage.getItem("refreshToken") : null;
        if (refreshToken) {
          try {
            const response = await axiosInstance.post("/auth/refresh", {
              refreshToken
            });
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("refreshToken", response.data.refreshToken);
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${response.data.token}`;
            }
            return axiosInstance(originalRequest);
          } catch (refreshError) {
            store.dispatch(logoutUser());
            localStorage.removeItem("token");
            localStorage.removeItem("refreshToken");
          }
        } else {
          store.dispatch(logoutUser());
        }
      }
      switch ((_b = error.response) == null ? void 0 : _b.status) {
        case 400:
          console.error("Bad Request:", error.response.data);
          break;
        case 403:
          console.error("Forbidden:", error.response.data);
          break;
        case 404:
          console.error("Not Found:", error.response.data);
          break;
        case 500:
          console.error("Server Error:", error.response.data);
          break;
        default:
          console.error("Network Error:", error.message);
      }
      return Promise.reject(error);
    }
  );
};

// src/services/api/axiosBaseQuery.ts
var axiosBaseQuery = ({ baseUrl } = { baseUrl: "" }) => {
  const axiosInstance = axios.create({
    baseURL: baseUrl,
    headers: {
      "Content-Type": "application/json"
    }
  });
  setupAxiosInterceptors(axiosInstance);
  return async ({ url, method = "GET", data, params, headers }) => {
    var _a, _b;
    try {
      const result = await axiosInstance({
        url,
        method,
        data,
        params,
        headers
      });
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError;
      return {
        error: {
          status: (_a = err.response) == null ? void 0 : _a.status,
          data: ((_b = err.response) == null ? void 0 : _b.data) || err.message
        }
      };
    }
  };
};

// src/services/api/apiSlice.ts
var apiSlice = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api"
  }),
  tagTypes: ["User", "Posts", "Settings"],
  endpoints: (builder) => ({})
});

// src/store/index.ts
var store = configureStore({
  reducer: {
    theme: themeSlice_default,
    lang: langSlice_default,
    user: userSlice_default,
    [apiSlice.reducerPath]: apiSlice.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: process.env.NODE_ENV !== "production"
});
var useAppDispatch = () => useDispatch();
var useAppSelector = useSelector;

// src/hooks/useTheme.ts
function useTheme() {
  const dispatch = useAppDispatch();
  const effectiveTheme = useAppSelector(selectEffectiveTheme);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedTheme = localStorage.getItem("theme") || "system";
      dispatch(setTheme(storedTheme));
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      dispatch(updateSystemPreference(mediaQuery.matches ? "dark" : "light"));
      const handleChange = (e) => {
        dispatch(updateSystemPreference(e.matches ? "dark" : "light"));
      };
      mediaQuery.addEventListener("change", handleChange);
      return () => {
        mediaQuery.removeEventListener("change", handleChange);
      };
    }
  }, [dispatch]);
  useEffect(() => {
    if (typeof window !== "undefined" && typeof document !== "undefined") {
      const root = document.documentElement;
      if (effectiveTheme === "dark") {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    }
  }, [effectiveTheme]);
  return {
    theme: effectiveTheme,
    setTheme: (theme) => dispatch(setTheme(theme))
  };
}

// src/components/ThemeToggle/ThemeToggle.tsx
function ThemeToggle({ className }) {
  const { t } = useTranslation3();
  const { theme, setTheme: setTheme2 } = useTheme();
  return /* @__PURE__ */ React12.createElement(
    Button,
    {
      variant: "ghost",
      size: "icon",
      onClick: () => setTheme2(theme === "dark" ? "light" : "dark"),
      className: cn("rounded-full", className),
      "aria-label": t(theme === "dark" ? "theme.light" : "theme.dark")
    },
    /* @__PURE__ */ React12.createElement(Sun, { className: "h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" }),
    /* @__PURE__ */ React12.createElement(Moon, { className: "absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" })
  );
}

// src/components/LanguageToggle/LanguageToggle.tsx
import React13 from "react";
import { Globe } from "lucide-react";
function LanguageToggle({ className }) {
  const dispatch = useAppDispatch();
  const currentLanguage = useAppSelector(selectCurrentLanguage);
  const availableLanguages = useAppSelector(selectAvailableLanguages);
  const handleLanguageChange = (value) => {
    dispatch(setLanguage(value));
  };
  return /* @__PURE__ */ React13.createElement("div", { className: cn("flex items-center space-x-2", className) }, /* @__PURE__ */ React13.createElement(Globe, { className: "h-4 w-4 text-neutral-500" }), /* @__PURE__ */ React13.createElement(Select, { value: currentLanguage, onValueChange: handleLanguageChange }, /* @__PURE__ */ React13.createElement(SelectTrigger, { className: "w-[70px] h-8" }, /* @__PURE__ */ React13.createElement(SelectValue, { placeholder: currentLanguage.toUpperCase() })), /* @__PURE__ */ React13.createElement(SelectContent, null, availableLanguages.map((lang) => /* @__PURE__ */ React13.createElement(SelectItem, { key: lang, value: lang }, lang.toUpperCase())))));
}
export {
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  LanguageToggle,
  LoginForm,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
  Switch,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Textarea,
  ThemeToggle,
  Toast,
  ToastAction,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
  buttonVariants,
  cn,
  debounce,
  forgotPasswordSchema,
  formatDate,
  get,
  locales_default as i18n,
  isDarkMode,
  loginSchema,
  logoutUser,
  registerSchema,
  resetPasswordSchema,
  sanitizeHtml,
  seaBlueTheme,
  selectAvailableLanguages,
  selectCurrentLanguage,
  selectEffectiveTheme,
  selectError,
  selectIsAuthenticated,
  selectIsLoading,
  selectTheme,
  selectUser,
  setError,
  setLanguage,
  setLoading,
  setTheme,
  setUser,
  storage,
  store,
  updateSystemPreference,
  useAppDispatch,
  useAppSelector,
  useForm,
  useFormField,
  useTheme
};
