import { flatten } from 'flat'

class BlackbaseRulesObject {
  private rules: Array<string>
  
  constructor (_template: object) {
    
  }

  static getDeepObjectKeys(_obj: object, _prefix = '') {
    let _result = []
    for (let _key in _obj) {
      _result.push(_prefix + _key)
      if (_obj[_key] instanceof Object) {
        _result = _result.concat(
          BlackbaseRulesObject.getDeepObjectKeys(_obj[_key],
                                                 _prefix + _key + '.')
          )
      }
    }
    //return _result
  }
}

export default BlackbaseRulesObject