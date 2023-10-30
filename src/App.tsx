import {Component} from 'react';
import type {MouseEvent, ChangeEvent} from 'react';
import './styles/App.css';
import List from './components/List';
import Loading from './components/ui/Loading';
import Search from './components/Search';
import type { AppState } from './dto/types';
import { getAstronomicalObject } from './api/api';

const PAGE_LIMIT = 10;

export default class extends Component {
  public state: AppState;

  constructor(props: object) {
    super(props);
    this.state = {
      items: [],
      offset: 0,
      limit: PAGE_LIMIT,
      isLoading: true,
      searchQuery: localStorage.getItem('searchQuery') || '', 
    };
  }

  render() {
    return (
      <>
        <header style={{display: 'flex', justifyContent: 'center'}} className='header'>
          <Search
            searchQuery={this.state.searchQuery}
            setAppState={(state: Partial<AppState>): void => this.setState(state)}
            updateItems={() => this.updateItems()}
          />
          <button onClick={() => { throw new Error('Error button handle') }}>Error</button>
        </header>
        <hr />
        <main className='main'>
          {
            this.state.isLoading
            ? <Loading/>
            : <List items={this.state.items}/>
          }
        </main>
      </>
    );
  }

  changeInputHandle(e: ChangeEvent): void {
    e.preventDefault();
    const input = e.target as HTMLInputElement;
    this.setState({ searchQuery: input.value.trim()});
  }

  async searchButtonHandle(e: MouseEvent): Promise<void> {
    e.preventDefault();
    localStorage.setItem('searchQuery', this.state.searchQuery);
    await this.updateItems();
  }

  async updateItems(): Promise<void> {
    const {offset, searchQuery} = this.state;
    this.setState({ isLoading: true });
    const items = await getAstronomicalObject({ limit: PAGE_LIMIT, offset, searchQuery });
    this.setState({ items, isLoading: false });
  }

  async componentDidMount(): Promise<void> {
    await this.updateItems();
  };
}
