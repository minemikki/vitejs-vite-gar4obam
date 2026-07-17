import { memo } from 'react'
import type { LucideProps, LucideIcon } from 'lucide-react'
import {
  AlertCircle, AlertTriangle, ArrowLeftRight, Award, Baby, Banknote, Bell, BellOff, Bike,
  Book, Building, Calendar, CalendarDays, Car, ChartColumnIncreasing, CheckCircle2, CircleDot,
  Clapperboard, Clock, Coffee, Coins, CreditCard, Dog, Dumbbell, Egg, Film, Flame, Footprints,
  Fuel, Gamepad2, Gem, Gift, GraduationCap, HeartPulse, Home, Inbox, Landmark, Laptop,
  LayoutDashboard, Music, PartyPopper, Percent, Phone, PiggyBank, Plane, Receipt, ReceiptText,
  Repeat, Rocket, Settings, Shapes, ShieldCheck, Shirt, ShoppingBag, ShoppingCart, Sparkles,
  Swords, Tags, Target, TrainFront, Trash2, TrendingDown, TrendingUp, Trophy, User, Users,
  Utensils, UtensilsCrossed, Wallet, Wifi, Wrench, Zap,
} from 'lucide-react'

// Explicit registry keeps the bundle tree-shakeable (vs `import * as Icons`).
const REGISTRY: Record<string, LucideIcon> = {
  AlertCircle, AlertTriangle, ArrowLeftRight, Award, Baby, Banknote, Bell, BellOff, Bike,
  Book, Building, Calendar, CalendarDays, Car, ChartColumnIncreasing, CheckCircle2, CircleDot,
  Clapperboard, Clock, Coffee, Coins, CreditCard, Dog, Dumbbell, Egg, Film, Flame, Footprints,
  Fuel, Gamepad2, Gem, Gift, GraduationCap, HeartPulse, Home, Inbox, Landmark, Laptop,
  LayoutDashboard, Music, PartyPopper, Percent, Phone, PiggyBank, Plane, Receipt, ReceiptText,
  Repeat, Rocket, Settings, Shapes, ShieldCheck, Shirt, ShoppingBag, ShoppingCart, Sparkles,
  Swords, Tags, Target, TrainFront, Trash2, TrendingDown, TrendingUp, Trophy, User, Users,
  Utensils, UtensilsCrossed, Wallet, Wifi, Wrench, Zap,
}

export const ICON_NAMES = Object.keys(REGISTRY)

export const Icon = memo(function Icon({ name, ...props }: { name: string } & LucideProps) {
  const C = REGISTRY[name] ?? Shapes
  return <C {...props} />
})
