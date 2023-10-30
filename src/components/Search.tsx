import {ChangeEvent, Component} from 'react';
import type { SearchProps } from '../dto/types';

export default class extends Component<SearchProps, object> {
  constructor(props: SearchProps) {
    super(props);
  }

  render() {
    return (
      <div className='search'>
        <input onChange={(e) => this.changeInputHandle(e)} type='search' value={this.props.searchQuery}/>
        <button onClick={() => this.searchButtonHandle()}>Search</button>
      </div>
    )
  }

  changeInputHandle(e: ChangeEvent): void {
    e.preventDefault();
    const input = e.target as HTMLInputElement;
    this.props.setAppState({ searchQuery: input.value.trim()});
  }

  async searchButtonHandle(): Promise<void> {
    localStorage.setItem('searchQuery', this.props.searchQuery);
    await this.props.updateItems();
  }
}
