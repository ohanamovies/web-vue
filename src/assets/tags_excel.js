let tags_excel_copy = require('./tags_excel.json').records
//import fetch from 'node-fetch'

function getTagsLocal(lang) {
  return adaptTags(tags_excel_copy, lang)
}
function adaptTags(tags_excel, lang) {
  /*let tags_excel = await fetch(
    'https://script.googleusercontent.com/macros/echo?user_content_key=WX7_CkVcDYYG8ckrWmqPw73gVMxYKW6Bpusx02u2QBVvPbffqcTLaXsTvv1Np-4aeu2ZOC6UwOVc4RJZZKSTrWfeRitZ17NpOJmA1Yb3SEsKFZqtv3DaNYcMrmhZHmUMWojr9NvTBuBLhyHCd5hHa5V7SzAZj2xBfFDRtNxpfsmuqfjnOYLBpWrI3G8IWJh29l4LSossvEa_fiNHZ0znxEBErwHi9mmiH5-9NQj1Fcu3hpOOhlyi7z3asNxrX_-RehUT3gRYzxpsMTuA4xoUQNlesTh-p4pFwqJbeTowOR_fVIgxkfofiQ&lib=M7OO09pfGNQD9igEAo4bouJoiE_6Oxspk'
  ).then((response) => response.json())*/

  let tags = {
    scene: [],
    values: [],
    sections: [],
  }

  for (let i = 0; i < tags_excel.length; i++) {
    const tag = localizeTag(tags_excel[i], lang)

    const mapGroup = {
      scene: 'scene',
      context: 'scene',
      group: 'values',
      value: 'values',
    }

    if (!mapGroup[tag.type]) continue //skip these
    tags[mapGroup[tag.type]].push(tag)
  }

  return tags
}

function localizeTag(tag, lang) {
  let localized = {}
  Object.keys(tag).forEach((key) => {
    if (key.includes('_')) {
      let final_key = key.split('_')[0]
      let tagLang = key.split('_')[1]
      if (!localized[final_key]) localized[final_key] = null
      if (tagLang == lang) localized[final_key] = tag[key]
    } else {
      localized[key] = tag[key]
    }
  })
  //convert parents to array
  localized.parents = localized.parents.replace(/ /g, '')
  if (localized.parents == '') {
    localized.parents = []
  } else {
    localized.parents = localized.parents.split(',')
  }
  return localized
}

module.exports = { getTagsLocal, adaptTags }
