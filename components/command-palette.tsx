"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Search, Home, LayoutDashboard, Coins, Users, FileText, Settings, ExternalLink } from "lucide-react"

type Route = {
  label: string
  path: string
  icon: React.ReactNode
}

const routes: Route[] = [
  {
    label: "Home",
    path: "/",
    icon: <Home className="mr-2 h-4 w-4" />,
  },
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: <LayoutDashboard className="mr-2 h-4 w-4" />,
  },
  {
    label: "Presale",
    path: "/presale",
    icon: <Coins className="mr-2 h-4 w-4" />,
  },
  {
    label: "Affiliate",
    path: "/affiliate",
    icon: <Users className="mr-2 h-4 w-4" />,
  },
  {
    label: "Articles",
    path: "/articles",
    icon: <FileText className="mr-2 h-4 w-4" />,
  },
]

export function CommandPalette() {
  const [open, setOpen] = React.useState(false)
  const router = useRouter()

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const runCommand = React.useCallback((command: () => void) => {
    setOpen(false)
    command()
  }, [])

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
      >
        <Search className="mr-2 h-4 w-4" />
        <span>Search...</span>
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground ml-2">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="p-0 gap-0 glassmorphism">
          <Command className="rounded-lg border-none bg-transparent">
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Navigation">
                {routes.map((route) => (
                  <CommandItem
                    key={route.path}
                    onSelect={() => runCommand(() => router.push(route.path))}
                    className="flex items-center"
                  >
                    {route.icon}
                    <span>{route.label}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
              <CommandGroup heading="Actions">
                <CommandItem
                  onSelect={() => runCommand(() => window.open("https://etherscan.io", "_blank"))}
                  className="flex items-center"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  <span>View on Etherscan</span>
                </CommandItem>
                <CommandItem
                  onSelect={() => runCommand(() => window.open("https://ethereum.org", "_blank"))}
                  className="flex items-center"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  <span>Learn about Ethereum</span>
                </CommandItem>
                <CommandItem onSelect={() => runCommand(() => router.push("/dashboard"))} className="flex items-center">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </DialogContent>
      </Dialog>
    </>
  )
}
