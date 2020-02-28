export const Phases = {
  Upkeep: [
    {
      title: 'Determine Kingdom Stability',
      description: [
        'Attempt a Stability check. If you succeed, Unrest decreases by 1 (if this would reduce Unrest below 0, add 1 BP to your Treasury instead). If you fail by 4 or less, Unrest increases you fail by 5 or more, Unrest increases by 1d4.'
      ]
    },
    {
      title: 'Pay Consumption',
      description: [
        'Subtract your kingdom’s Consumption from the kingdom’s Treasury. If your Treasury is negative after paying Consumption, Unrest increases by 2.'
      ]
    },
    {
      title: 'Fill Vacant Magic Item Slots',
      description: [
        'If any of your settlement districts have buildings that produce magic items (such as a Caster’s Tower or Herbalist) with vacant magic item slots, there is a chance of those slots filling with new items.'
      ]
    },
    {
      title: 'Modify Unrest',
      description: [
        'Unrest increases by 1 for each kingdom attribute (Economy, Loyalty, or Stability) that is a negative number.',
        'The Royal Enforcer may attempt to reduce Unrest during this step.'
      ]
    }
  ]
}
