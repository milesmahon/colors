import Fuse from 'fuse.js';
import colors from '../../public/colors.json';
import fuseIndex from '../../public/fuse-index.json';

export default function SearchResults({ searchTerm }) {
    const index = Fuse.parseIndex(fuseIndex)

    const options = {
      keys: ['name'],
      threshold: 0.6,
      minMatchCharLength: 2,
    };
    const fuse = new Fuse(colors, options, index);
    var results = fuse.search(searchTerm);
    results = results.map((color) => (color.item))
    results.length = Math.min(results.length, 10)
  
    return (
        <div className="my-6">
        {results.map((color) => (
            <p style={{color: `${color.hex}`}} key={color.name}>{color.name}</p>))
        }
        </div>
    )
}