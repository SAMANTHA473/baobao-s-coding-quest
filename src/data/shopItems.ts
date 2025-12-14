export interface ShopItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'costume' | 'potion';
  emoji: string;
  effect?: string;
}

export const shopItems: ShopItem[] = [
  {
    id: 'explorer-garb',
    name: "Explorer's Garb",
    description: 'A stylish adventurer outfit for BaoBao',
    price: 50,
    category: 'costume',
    emoji: '🧥',
  },
  {
    id: 'deep-sea-coder',
    name: 'Deep-Sea Coder',
    description: 'Underwater themed coding gear',
    price: 75,
    category: 'costume',
    emoji: '🤿',
  },
  {
    id: 'wizard-robes',
    name: 'Wizard Robes',
    description: 'Magical robes for the coding wizard',
    price: 100,
    category: 'costume',
    emoji: '🧙',
  },
  {
    id: 'space-suit',
    name: 'Space Suit',
    description: 'Code among the stars!',
    price: 150,
    category: 'costume',
    emoji: '👨‍🚀',
  },
  {
    id: 'quick-fix-serum',
    name: 'Quick Fix Serum',
    description: 'Reveals the correct answer once',
    price: 30,
    category: 'potion',
    emoji: '🧪',
    effect: 'reveal_answer',
  },
  {
    id: 'hint-potion',
    name: 'Free Hint Potion',
    description: 'Get one free hint (pack of 3)',
    price: 25,
    category: 'potion',
    emoji: '💡',
    effect: 'free_hints',
  },
  {
    id: 'coin-boost',
    name: 'Coin Boost Elixir',
    description: 'Earn double coins for 5 levels',
    price: 40,
    category: 'potion',
    emoji: '✨',
    effect: 'double_coins',
  },
  {
    id: 'retry-potion',
    name: 'Second Chance Potion',
    description: 'Retry a level without penalty',
    price: 20,
    category: 'potion',
    emoji: '🔄',
    effect: 'retry',
  },
];

export const getCostumeItems = () => shopItems.filter((item) => item.category === 'costume');
export const getPotionItems = () => shopItems.filter((item) => item.category === 'potion');
