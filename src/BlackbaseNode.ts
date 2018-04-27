import { EventEmitter } from 'events'

export default class BlackbaseNode {
  private events: EventEmitter = new EventEmitter()
  private value: any = null

  public constructor (_value = null) {
    this.set(_value)
  }

  public get () {
    this.events.emit('get', this.value)
    return this.value
  }

  public set (_newValue: any) {
    this.events.emit('set', this.value, _newValue)

    if (typeof _newValue === 'object' && _newValue !== null && _newValue !== undefined) {
      this.value = {}

      for (let _key of Object.keys(_newValue)) {
        let _childDescriptor = {
          value: new BlackbaseNode(_newValue[_key]),
          configurable: true,
          enumerable: true,
          writable: false
        }
        Object.defineProperty(
          this.value,
          _key,
          _childDescriptor
        )
        Object.defineProperty(
          this,
          _key,
          _childDescriptor
        )
      }
    } else {
      this.value = _newValue
    }
  }

  /* 
    Events 
  */
  public on (_event: string, _listener) {
    return this.events.on(_event, _listener)
  }

  public once (_event: string, _listener) {
    return this.events.once(_event, _listener)
  }

  public off (_event: string, _listener = null) {
    if (_listener !== null) {
      this.events.removeListener(_event, _listener)
    } else {
      this.events.removeAllListeners(_event)
    }
  }
  
}