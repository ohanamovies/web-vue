var content = [
  {
    value: 'Sex/Nudity',
    title: 'Sex/Nudity',
    description: '',
    color: 'green',
    severity: [
      {
        value: 'Very erotic',
        title: 'Very erotic',
        description: 'Very erotic or graphic scene, eg: sex, foreplay, moaning...',
        implies: ['Very erotic', 'Moderately erotic', 'Mildly erotic', 'Slightly erotic'],
      },
      {
        value: 'Moderately erotic',
        title: 'Moderately erotic',
        description:
          'Moderately erotic or graphic scene, eg: passionate kissing, provocative dancing, graphic sexual remarks...',
        implies: ['Moderately erotic', 'Mildly erotic', 'Slightly erotic'],
      },
      {
        value: 'Mildly erotic',
        title: 'Mildly erotic',
        description:
          'Mildly erotic or graphic scene, eg: brief kiss, revealing outfit, mild sexual reference...',
        implies: ['Mildly erotic', 'Slightly erotic'],
      },
      {
        value: 'Slightly erotic',
        title: 'Slightly erotic',
        description: "Nudity with no erotic purpose, eg: Michelangelo's David, human corpse...",
        implies: ['Slightly erotic'],
      },
    ],
    context: [
      {
        value: 'No consent',
        title: 'No consent',
        description: 'Lack or inability to consent, eg: rape, child molestation, harassment...',
      },
      {
        value: 'Unloving/objectifying',
        title: 'Unloving/objectifying',
        description:
          'Limited intention to bond, care or look after the other, eg: one night stand, prostitution, striptease...',
      },
      {
        value: 'Non-procreative',
        title: 'Non-procreative',
        description:
          'Sexual intercourse outside a procreative context, eg: oral sex, anal sex, masturbation, explicit use of contraception...',
      },
      {
        value: 'Infidelity',
        title: 'Infidelity',
        description: 'Unfaithfulness to a partner, eg: adultery...',
      },
    ],
  },
  {
    value: 'Violence',
    title: 'Violence/Gore',
    description: '',
    color: 'red',
    severity: [
      {
        value: 'Very gory',
        title: 'Very gory',
        description: 'Very gory or graphic scene, eg: blood splattered, open wounds, guts...',
        implies: ['Very gory', 'Moderately gory', 'Mildly gory', 'Slightly gory'],
      },
      {
        value: 'Moderately gory',
        title: 'Moderately gory',
        description: 'Moderately gory or graphic scene, eg: extensive bleeding, broken bones...',
        implies: ['Moderately gory', 'Mildly gory', 'Slightly gory'],
      },
      {
        value: 'Mildly gory',
        title: 'Mildly gory',
        description: 'Mildly gory or graphic scene, eg: mild verbal violence, punching',
        implies: ['Mildly gory, Slightly gory'],
      },

      {
        value: 'Slightly gory',
        title: 'Slightly gory',
        description: 'Violence is implied but nothing is shown',
        implies: ['Slightly gory'],
      },
    ],
    context: [
      {
        value: 'Discrimination',
        title: 'Discrimination',
        description: 'Verbal of physical violence due to race, sex, religion, disability...',
      },
      {
        value: 'Cruelty',
        title: 'Cruelty',
        description: 'One of the parties is significantly weaker or have no chance of winning',
      },
      {
        value: 'Power imbalance',
        title: 'Power imbalance',
        description: 'One of the parties is significantly weaker or have no chance of winning',
      },
      {
        value: 'Self harm',
        title: 'Self harm',
        description: 'Self inflicted pain or damage, eg: suicide...',
      },
    ],
  },

  //--- PROFANITY ------------
  {
    value: 'Profanity',
    title: 'Profanity',
    description: '',
    color: 'black',
    severity: [
      {
        value: 'Very profane',
        title: 'Very profane',
        description: 'Blasphemy: Speaking sacrilegiously about God or sacred things',
        implies: ['Very profane', 'Moderately profane', 'Mildly profane', 'Slighty profane'],
      },
      {
        value: 'Moderately profane',
        title: 'Moderately profane',
        description: 'Swear words',
        implies: ['Moderately profane', 'Mildly profane', 'Slighty profane'],
      },
      {
        value: 'Mildly profane',
        title: 'Mildly profane',
        description: 'Mild language, eg: h*ll, d*mn...',
        implies: ['Mildly profane', 'Slighty profane'],
      },
      {
        value: 'Slighty profane',
        title: 'Slighty profane',
        description: '',
        implies: ['Slighty profane'],
      },
    ],
    context: [],
  },

  //-------------

  {
    value: 'Other',
    title: 'Other',
    description: '',
    color: 'blue',
    severity: [],
    context: [
      {
        value: 'Mild profanity',
        title: 'Mild profanity',
        description: 'Mild language, eg: h*ll, d*mn...',
        implies: [],
      },
      {
        value: 'Strong profanity',
        title: 'Strong profanity',
        description: 'Swear words',
        implies: ['Mild profanity'],
      },
      {
        value: 'Blasphemy',
        title: 'Blasphemy',
        description: 'Speaking sacrilegiously about God or sacred things',
        implies: [],
      },
      {
        value: 'Legal drugs',
        title: 'Legal drugs',
        description: 'Consumption of legal drugs, eg: alcohol, tobacco...',
        implies: ['Illegal drugs'],
      },
      {
        value: 'Illegal drugs',
        title: 'Illegal drugs',
        description: 'Consumption or dealing of illegal drugs, eg: weed, cocaine...',
        implies: [],
      },
    ],
  },
]

var actions = {
  types_title: 'Anything else?',
  types: [
    { value: 'Sound only', title: 'Sound only', description: 'Tags apply only to sound' },
    { value: 'Video only', title: 'Video only', description: 'Tags apply only to video.' },
    {
      value: 'Local',
      title: 'Local',
      description: 'Store only on your computer. Do not share it with others.',
    },
    {
      value: 'Mild plot',
      title: 'Mild plot',
      description: 'This scene is Mildly important for the plot.',
    },
    {
      value: 'Strong plot',
      title: 'Strong plot',
      description: 'This scene is very important for the plot.',
    },
  ],
}

var categories = content.map((x) => x.value) //[c1, c2, c3...]
var severities = content.map((x) => x.severity.map((y) => y.value)) // [[cat1-sev1, cat1-sev2,...], [cat2-sev1, cat2-sev2...]]
var descriptions = content.map((x) => x.severity.map((y) => y.description)) // [[cat1-sev1, cat1-sev2,...], [cat2-sev1, cat2-sev2...]]

//var severitiesR = content.map((x) => [...x.severity].reverse().map((y) => y.value)) // [[cat1-sev1, cat1-sev2,...], [cat2-sev1, cat2-sev2...]]
//var descriptionsR = content.map((x) => [...x.severity].reverse().map((y) => y.description)) // [[cat1-sev1, cat1-sev2,...], [cat2-sev1, cat2-sev2...]]

var context = content.map((x) => x.context.map((y) => y.value)) //[[cat1-context1, cat2-context2], [cat2-context1, cat2-context2...]]

module.exports = {
  content,
  actions,
  categories,
  severities,
  descriptions,

  //severitiesR,
  //descriptionsR,

  context,
}
