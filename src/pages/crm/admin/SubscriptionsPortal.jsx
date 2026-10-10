import React from 'react';
import { DollarSign, Check, Building2, Users, ShieldCheck, Zap } from 'lucide-react';

export const SubscriptionsPortal = () => {
  const plans = [
    {
      id: 'free',
      name: 'Free Package',
      target: 'Circulators / Signature Gatherers',
      price: '$0',
      period: 'Forever',
      icon: Users,
      color: 'slate',
      features: ['Create account & upload ID', 'Sign electronic agreements', 'Onboarding process completion', 'Read dashboard messages'],
    },
    {
      id: 'basic',
      name: 'Basic',
      target: 'Active Gatherers',
      price: '$29',
      period: '/mo (billed annually)',
      icon: Zap,
      color: 'blue',
      features: ['Everything in Free', 'Full access to portal', 'Activity Tracking', 'Commissions dashboard'],
    },
    {
      id: 'pro',
      name: 'Pro',
      target: 'Team Leaders (Coordinators & Managers)',
      price: '$99',
      period: '/mo (billed annually)',
      icon: Building2,
      color: 'indigo',
      features: ['Team Management', 'Commission Maker Tool', 'Validation "Compliance" Feature', 'Live Social Feed & Messaging', 'Payroll ADP Sync', 'Territory Management'],
      popular: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      target: 'Campaign Managers',
      price: '$499',
      period: '/mo (billed annually)',
      icon: ShieldCheck,
      color: 'emerald',
      features: ['Advanced Demographics & Stats', 'Voter Data by County', 'Custom Data Reporting', 'Dedicated Validation Team Tools'],
    }
  ];

  return (
    <div className="h-full bg-surface text-primary overflow-y-auto pb-10">
      <div className="border-b border-border bg-surface-secondary p-6 backdrop-blur-xl sticky top-0 z-30">
        <h1 className="text-2xl font-bold text-primary flex items-center gap-3">
          <div className="p-2 bg-indigo-500/20 rounded-lg">
            <DollarSign className="w-6 h-6 text-indigo-400" />
          </div>
          Subscriptions Portal
        </h1>
        <p className="mt-1 text-sm text-secondary">
          Manage pricing plans, billing, and software packages for iCanvass PDM users.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan) => {
            const Icon = plan.icon;
            return (
              <div key={plan.id} className={`relative flex flex-col bg-surface-secondary border rounded-3xl p-6 transition-all hover:bg-surface-secondary ${
                plan.popular ? 'border-indigo-500 shadow-xl shadow-indigo-500/10 scale-105 z-10' : 'border-border'
              }`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-500 to-purple-500 text-primary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Most Popular
                  </div>
                )}
                
                <div className={`w-12 h-12 rounded-xl mb-6 flex items-center justify-center ${
                  plan.popular ? 'bg-indigo-500/20 text-indigo-400' : 'bg-surface-secondary/50 text-secondary'
                }`}>
                  <Icon className="w-6 h-6" />
                </div>
                
                <h3 className="text-xl font-bold text-primary mb-1">{plan.name}</h3>
                <p className="text-xs text-secondary font-semibold mb-4 min-h-[32px]">{plan.target}</p>
                
                <div className="flex items-baseline gap-1 mb-6 border-b border-border pb-6">
                  <span className="text-4xl font-black text-primary">{plan.price}</span>
                  <span className="text-xs text-secondary font-medium">{plan.period}</span>
                </div>
                
                <div className="flex-1 space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="mt-0.5 bg-emerald-500/20 p-0.5 rounded-full text-emerald-400">
                        <Check className="w-3 h-3" />
                      </div>
                      <span className="text-sm text-secondary leading-snug">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <button className={`w-full py-3 rounded-xl font-bold transition-all ${
                  plan.popular 
                    ? 'bg-indigo-600 hover:bg-indigo-500 text-primary shadow-lg shadow-indigo-500/25' 
                    : 'bg-surface-secondary hover:bg-surface-hover text-primary'
                }`}>
                  Manage Plan
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
