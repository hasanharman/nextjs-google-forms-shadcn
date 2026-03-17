# Next.js Google Forms × shadcn/ui

A minimal, production-ready contact form that submits directly to Google Forms — no backend required. Built with Next.js, shadcn/ui, React Hook Form, and Zod.

## Features

- 🚀 **Zero backend** — submits directly to Google Forms via `fetch`
- 🎨 **shadcn/ui** — clean, accessible form components
- ✅ **Zod validation** — trim, min/max length, email format
- 📱 **Responsive** — mobile-first grid layout
- 🔒 **Type-safe** — end-to-end TypeScript

## Quick Start

### 1. Clone

```bash
git clone https://github.com/hasanharman/nextjs-google-forms-shadcn.git
cd nextjs-google-forms-shadcn
```

### 2. Install

```bash
pnpm install
```

### 3. Configure

Open `page.tsx` and replace the placeholder values with your own Google Form details:

```ts
const GOOGLE_FORM_ACTION = "YOUR_GOOGLE_FORM_ACTION_URL";

const GOOGLE_ENTRIES = {
  firstName: "YOUR_FIRST_NAME_ENTRY_ID",
  lastName: "YOUR_LAST_NAME_ENTRY_ID",
  email: "YOUR_EMAIL_ENTRY_ID",
  message: "YOUR_MESSAGE_ENTRY_ID",
} as const;
```

### 4. Run

```bash
pnpm dev
```

## How to Find Your Google Form Entry IDs

### Option 1: Google Forms HTML Exporter (Recommended)

The easiest way to extract form action URLs and entry IDs:

1. Go to [**Google Forms HTML Exporter**](https://stefano.brilli.me/google-forms-html-exporter/)
2. Paste your Google Form URL
3. It will output all the field names (`entry.XXXXXXX`), the form action URL, and meta fields

> Source: [cybercase/google-forms-html-exporter](https://github.com/cybercase/google-forms-html-exporter)

### Option 2: Pre-filled Link Method

1. Open your Google Form in edit mode
2. Click the **three-dot menu (⋮)** → **Get pre-filled link**
3. Fill in dummy values for each field and click **Get link**
4. The URL will contain parameters like `entry.510901007=dummy` — those are your entry IDs

## Tech Stack

| Tool | Purpose |
|---|---|
| [Next.js](https://nextjs.org) | Framework |
| [shadcn/ui](https://ui.shadcn.com) | UI components |
| [React Hook Form](https://react-hook-form.com) | Form state management |
| [Zod](https://zod.dev) | Schema validation |
| [Sonner](https://sonner.emilkowal.dev) | Toast notifications |

## License

MIT
