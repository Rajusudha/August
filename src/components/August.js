import {useState,useEffect} from 'react'

function August() {
    const [coins, setCoins] = useState([]);
    const [filteredCoins, setFilteredCoins] = useState([]);
    const [search, setSearch] = useState('');
    const [sortType, setSortType] = useState(null); // Sort type for market cap or percentage change
  
    // Fetch data using async/await
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false');
        const data = await response.json();
        setCoins(data);
        setFilteredCoins(data); // Initialize with full data
      } catch (error) {
        console.error('Error fetching the data:', error);
      }
    };
  
    // Fetch data on component mount
    useEffect(() => {
      fetchData();
    }, []);
  
    // Handle search input
    const handleSearch = (e) => {
      const keyword = e.target.value.toLowerCase();
      setSearch(keyword);
      const filtered = coins.filter(coin => coin.name.toLowerCase().includes(keyword));
      setFilteredCoins(filtered);
    };
  
    // Sort by Market Cap
    const sortByMarketCap = () => {
      const sortedCoins = [...filteredCoins].sort((a, b) => b.market_cap - a.market_cap);
      setFilteredCoins(sortedCoins);
      setSortType('market_cap');
    };
  
    // Sort by Percentage Change (in 24h)
    const sortByPercentageChange = () => {
      const sortedCoins = [...filteredCoins].sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h);
      setFilteredCoins(sortedCoins);
      setSortType('percentage_change');
    };

  return (
    <div className='august'>
        <div className="August">
            <div className="input_button">
                {/* Search input */}       
        <input
        type="text"
        value={search}
        onChange={handleSearch}
        placeholder="Search by name"
        id='input'
       
      />
      {/* Sort Buttons */}
       
         <div className="Button">
         <button onClick={sortByMarketCap} style={{ marginRight: '10px' }}>Sort by Market Cap</button>
         <button onClick={sortByPercentageChange}>Sort by Percentage Change</button>
         </div>
            </div>
             
       
            <table class="content-table" >
                <thead>
                    {/* <tr>
                    <th>Image</th>
            <th>Name</th>
            <th>Symbol</th>
            <th>Current Price (USD)</th>
            <th>Market Cap</th>
            <th>Percentage Change (24h)</th>
            <th>Total Volume</th>
                        
                    </tr> */}
                </thead>
                <tbody>
                {filteredCoins.map((coin) => (
            <tr key={coin.id}>
              <td>
               {/* <div className='img'><img src={coin.image} alt={coin.name}  /></div>  */}
               <img src={coin.image} alt={coin.name} id='img'  />
              </td>
              <td>{coin.name}</td>
              <td>{coin.symbol.toUpperCase()}</td>
              <td>${coin.current_price.toLocaleString()}</td>
              <td>${coin.market_cap.toLocaleString()}</td>
              <td style={{color:'green'}}>
                {coin.price_change_percentage_24h.toFixed(2)}%
              </td>
              <td>Mkt Cap :${coin.total_volume.toLocaleString()}</td>
              <div className='line'></div>
            </tr>
            
          ))}
                </tbody>
            </table>
        </div>
      
    </div>
  )
}

export default August
