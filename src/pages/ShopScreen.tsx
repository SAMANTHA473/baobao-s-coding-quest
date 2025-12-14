import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CoinDisplay } from '@/components/game/CoinDisplay';
import { useGame } from '@/contexts/GameContext';
import { shopItems, getCostumeItems, getPotionItems } from '@/data/shopItems';
import { ArrowLeft, ShoppingBag } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ShopScreen: React.FC = () => {
  const navigate = useNavigate();
  const { gameState, spendCoins, addToInventory } = useGame();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'costumes' | 'potions'>('costumes');

  const items = activeTab === 'costumes' ? getCostumeItems() : getPotionItems();

  const handleBuy = (itemId: string, price: number, name: string) => {
    if (gameState.inventory.includes(itemId)) {
      toast({
        title: 'Already Owned!',
        description: `You already have ${name} in your inventory.`,
      });
      return;
    }

    if (spendCoins(price)) {
      addToInventory(itemId);
      toast({
        title: 'Purchase Successful! 🎉',
        description: `You bought ${name}!`,
      });
    } else {
      toast({
        title: 'Not enough coins!',
        description: `You need ${price} coins to buy this item.`,
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-100 via-purple-50 to-pink-100 flex flex-col p-4 md:p-6 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 text-5xl animate-float opacity-40">🛍️</div>
        <div className="absolute top-32 right-16 text-4xl animate-float opacity-30" style={{ animationDelay: '1s' }}>💎</div>
        <div className="absolute bottom-40 left-20 text-6xl animate-sparkle opacity-30">✨</div>
        <div className="absolute bottom-20 right-10 text-4xl animate-float opacity-40" style={{ animationDelay: '0.5s' }}>🎁</div>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between mb-6 relative z-10 animate-slide-down">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate('/home')}
          className="text-foreground"
        >
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <h1 className="font-display text-2xl font-bold flex items-center gap-2">
          <ShoppingBag className="w-6 h-6" />
          SHOP
        </h1>
        <CoinDisplay />
      </div>

      {/* Description */}
      <div className="text-center mb-6 relative z-10 animate-fade-in">
        <p className="font-body text-muted-foreground">
          Use your coins to buy costumes and potions to help answer the game's questions!
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 relative z-10">
        <Button
          variant={activeTab === 'costumes' ? 'castle' : 'outline'}
          className="flex-1"
          onClick={() => setActiveTab('costumes')}
        >
          👗 Costumes
        </Button>
        <Button
          variant={activeTab === 'potions' ? 'forest' : 'outline'}
          className="flex-1"
          onClick={() => setActiveTab('potions')}
        >
          🧪 Potions
        </Button>
      </div>

      {/* Items grid */}
      <div className="flex-1 overflow-y-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map((item, index) => {
            const isOwned = gameState.inventory.includes(item.id);
            const canAfford = gameState.coins >= item.price;

            return (
              <div
                key={item.id}
                className="card-fantasy animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start gap-4">
                  {/* Item icon */}
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center text-3xl shrink-0">
                    {item.emoji}
                  </div>

                  {/* Item info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display font-bold text-foreground truncate">
                      {item.name}
                    </h3>
                    <p className="font-body text-sm text-muted-foreground mb-3">
                      {item.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <span className="font-display font-bold text-lg text-amber-600">
                        {item.price} 🪙
                      </span>
                      <Button
                        variant={isOwned ? 'outline' : canAfford ? 'adventure' : 'outline'}
                        size="sm"
                        onClick={() => handleBuy(item.id, item.price, item.name)}
                        disabled={isOwned}
                      >
                        {isOwned ? '✓ Owned' : 'Buy'}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-6 text-center relative z-10">
        <Button variant="outline" onClick={() => navigate('/home')}>
          ← Back to Home
        </Button>
      </div>
    </div>
  );
};

export default ShopScreen;
