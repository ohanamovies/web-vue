var content = [
  {
    value: 'Sex/Nudity',
    title: { en: 'Sex/Nudity' },
    description: {
      en: 'We believe people should be loved, not used. We want to approach sex as a way of showing love/giving ourselves to the other person. Thus we try to avoid using other people (either physically or on a video) as a tool to obtain pleasure.',
      es: '',
    },
    color: 'green',
    severity: [
      {
        value: 'Very erotic',
        title: { en: 'Very erotic' },
        description: { en: 'Very erotic or graphic scene, eg: sex, foreplay, moaning...' },
        implies: ['Very erotic', 'Moderately erotic', 'Mildly erotic', 'Slightly erotic'],
      },
      {
        value: 'Moderately erotic',
        title: { en: 'Moderately erotic' },
        description: {
          en: 'Moderately erotic or graphic scene, eg: passionate kissing, provocative dancing, graphic sexual remarks...',
        },
        implies: ['Moderately erotic', 'Mildly erotic', 'Slightly erotic'],
      },
      {
        value: 'Mildly erotic',
        title: { en: 'Mildly erotic' },
        description: {
          en: 'Mildly erotic or graphic scene, eg: brief kiss, revealing outfit, mild sexual reference...',
        },
        implies: ['Mildly erotic', 'Slightly erotic'],
      },
      {
        value: 'Slightly erotic',
        title: { en: 'Slightly erotic' },
        description: {
          en: "Nudity with no erotic purpose, eg: Michelangelo's David, human corpse...",
        },
        implies: ['Slightly erotic'],
      },
    ],
    context: [
      {
        value: 'No consent',
        title: { en: 'No consent' },
        description: {
          en: 'Lack or inability to consent, eg: rape, child molestation, harassment...',
        },
      },
      {
        value: 'Unloving/objectifying',
        title: { en: 'Unloving/objectifying' },
        description: {
          en: 'Limited intention to bond, care or look after the other, eg: one night stand, prostitution, striptease...',
        },
      },
      {
        value: 'Non-procreative',
        title: { en: 'Non-procreative' },
        description: {
          en: 'Sexual intercourse outside a procreative context, eg: oral sex, anal sex, masturbation, explicit use of contraception...',
        },
      },
      {
        value: 'Infidelity',
        title: { en: 'Infidelity' },
        description: { en: 'Unfaithfulness to a partner, eg: adultery...' },
      },
    ],
  },
  {
    value: 'Violence',
    title: { en: 'Violence/Gore' },
    description: { en: '' },
    color: 'red',
    severity: [
      {
        value: 'Very gory',
        title: { en: 'Very gory' },
        description: {
          en: 'Very gory or graphic scene, eg: blood splattered, open wounds, guts...',
        },
        implies: ['Very gory', 'Moderately gory', 'Mildly gory', 'Slightly gory'],
      },
      {
        value: 'Moderately gory',
        title: { en: 'Moderately gory' },
        description: {
          en: 'Moderately gory or graphic scene, eg: extensive bleeding, broken bones...',
        },
        implies: ['Moderately gory', 'Mildly gory', 'Slightly gory'],
      },
      {
        value: 'Mildly gory',
        title: { en: 'Mildly gory' },
        description: { en: 'Mildly gory or graphic scene, eg: mild verbal violence, punching' },
        implies: ['Mildly gory, Slightly gory'],
      },

      {
        value: 'Slightly gory',
        title: { en: 'Slightly gory' },
        description: { en: 'Violence is implied but nothing is shown' },
        implies: ['Slightly gory'],
      },
    ],
    context: [
      {
        value: 'Discrimination',
        title: { en: 'Discrimination' },
        description: {
          en: 'Verbal of physical violence due to race, sex, religion, disability...',
        },
      },
      {
        value: 'Cruelty',
        title: { en: 'Cruelty' },
        description: {
          en: 'One of the parties is significantly weaker or have no chance of winning',
        },
      },
      {
        value: 'Power imbalance',
        title: { en: 'Power imbalance' },
        description: {
          en: 'One of the parties is significantly weaker or have no chance of winning',
        },
      },
      {
        value: 'Self harm',
        title: { en: 'Self harm' },
        description: { en: 'Self inflicted pain or damage, eg: suicide...' },
      },
    ],
  },

  //--- PROFANITY ------------
  {
    value: 'Profanity',
    title: { en: 'Profanity' },
    description: { en: '' },
    color: 'black',
    severity: [
      {
        value: 'Very profane',
        title: { en: 'Very profane' },
        description: { en: 'Blasphemy: Speaking sacrilegiously about God or sacred things' },
        implies: ['Very profane', 'Moderately profane', 'Mildly profane', 'Slighty profane'],
      },
      {
        value: 'Moderately profane',
        title: { en: 'Moderately profane' },
        description: { en: 'Swear words' },
        implies: ['Moderately profane', 'Mildly profane', 'Slighty profane'],
      },
      {
        value: 'Mildly profane',
        title: { en: 'Mildly profane' },
        description: { en: 'Mild language, eg: h*ll, d*mn...' },
        implies: ['Mildly profane', 'Slighty profane'],
      },
      {
        value: 'Slighty profane',
        title: { en: 'Slighty profane' },
        description: { en: '' },
        implies: ['Slighty profane'],
      },
    ],
    context: [],
  },

  //-------------

  {
    value: 'Other',
    title: { en: 'Other' },
    description: '',
    color: 'blue',
    severity: [],
    context: [
      {
        value: 'Mild profanity',
        title: { en: 'Mild profanity' },
        description: { en: 'Mild language, eg: h*ll, d*mn...' },
        implies: [],
      },
      {
        value: 'Strong profanity',
        title: { en: 'Strong profanity' },
        description: { en: 'Swear words' },
        implies: ['Mild profanity'],
      },
      {
        value: 'Blasphemy',
        title: { en: 'Blasphemy' },
        description: { en: 'Speaking sacrilegiously about God or sacred things' },
        implies: [],
      },
      {
        value: 'Legal drugs',
        title: { en: 'Legal drugs' },
        description: { en: 'Consumption of legal drugs, eg: alcohol, tobacco...' },
        implies: ['Illegal drugs'],
      },
      {
        value: 'Illegal drugs',
        title: { en: 'Illegal drugs' },
        description: { en: 'Consumption or dealing of illegal drugs, eg: weed, cocaine...' },
        implies: [],
      },
    ],
  },
]

var actions = {
  types_title: 'Anything else?',
  types: [
    {
      value: 'Sound only',
      title: { en: 'Sound only' },
      description: { en: 'Tags apply only to sound' },
    },
    {
      value: 'Video only',
      title: { en: 'Video only' },
      description: { en: 'Tags apply only to video.' },
    },
    {
      value: 'Local',
      title: { en: 'Local' },
      description: 'Store only on your computer. Do not share it with others.',
    },
    {
      value: 'Mild plot',
      title: { en: 'Mild plot' },
      description: { en: 'This scene is Mildly important for the plot.' },
    },
    {
      value: 'Strong plot',
      title: { en: 'Strong plot' },
      description: { en: 'This scene is very important for the plot.' },
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
