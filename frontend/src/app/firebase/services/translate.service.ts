import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class TranslateService {
  constructor () {}

  async getTranslate (wordToTranslate: string, languagePair: string) {
    let url = this.createUrl(wordToTranslate, languagePair)
    const response = await fetch(url)
    const data = await response.json()
    let matchesWord: Array<string> = data.matches.map(
      (match: { translation: any }) => match.translation
    )
    return matchesWord
  }

  async translateEnToHe (enWord: string) {
    let languagePair = 'en|he'
    let matchesWord = await this.getTranslate(enWord, languagePair)
    return removeCharacters(filterWordsWithNoEnglishLetters(matchesWord))
  }

  async translateHeToEn (heWord: string) {
    let languagePair = 'he|en'
    let matchesWord = await this.getTranslate(heWord, languagePair)
    return removeCharacters(matchesWord)
  }

  createUrl (wordToTranslate: string, languagePair: string) {
    return `https://api.mymemory.translated.net/get?q=${wordToTranslate}!&langpair=${languagePair}`
  }
}

function isEnglishWord (word: string) {
  const englishPattern = /[A-Za-z]/
  return !englishPattern.test(word)
}

function filterWordsWithNoEnglishLetters (words: Array<string>) {
  return words.filter(isEnglishWord)
}

function removeSymbols (word: string): string {
  const englishPattern = /[.'!"]/g
  return word.replace(englishPattern, '').trim()
}

function removeCharacters (words: string[]): string[] {
  return words.map(removeSymbols)
}
