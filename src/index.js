/* eslint-disable no-unused-vars */
import React from 'react';
/* eslint-enable no-unused-vars */

// If on dev uncomment this lines
import ReactDOM from 'react-dom';
import DiffContainer from './components/diff-container.jsx';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Loading from './components/loading.jsx';
import SunburstContainer from './components/sunburst-container';

let conf = require('./conf.json');

ReactDOM.render(
  <Router>
    <Switch>
      <Route path='/diff/([0-9]{14})/([0-9]{14})/(.+)' render={({match}) =>
        <DiffContainer site={match.params[2]} timestampA={match.params[0]} url={match.url}
          loader={<Loading waybackLoaderPath={'https://users.it.teithe.gr/~it133996/wayback-loader.svg'} />}
          timestampB={match.params[1]} fetchCDXCallback={null} conf={conf} fetchSnapshotCallback={null} />
      } />
      <Route path='/diff/([0-9]{14})//(.+)' render={({match}) =>
        <DiffContainer site={match.params[1]} timestampA={match.params[0]} url={match.url}
          loader={<Loading waybackLoaderPath={'https://users.it.teithe.gr/~it133996/wayback-loader.svg'} />}
          fetchCDXCallback={null} conf={conf} fetchSnapshotCallback={null}/>
      } />
      <Route path='/diff//([0-9]{14})/(.+)' render={({match}) =>
        <DiffContainer site={match.params[1]} timestampB={match.params[0]} url={match.url}
          loader={<Loading waybackLoaderPath={'https://users.it.teithe.gr/~it133996/wayback-loader.svg'} />}
          fetchCDXCallback={null} conf={conf} fetchSnapshotCallback={null}/>
      } />

      <Route path='/diff///(.+)' render={({match}) =>
        <DiffContainer site={match.params[0]} conf={conf} noTimestamps={true} fetchCDXCallback={null}
          loader={<Loading waybackLoaderPath={'https://users.it.teithe.gr/~it133996/wayback-loader.svg'} />}/>
      } />
      <Route path='/diff/(.+)' render={({match}) =>
        <DiffContainer site={match.params[0]} fetchCDXCallback={null}
          loader={<Loading waybackLoaderPath={'https://users.it.teithe.gr/~it133996/wayback-loader.svg'} />} conf={conf}/>}
      />
      <Route path='/diagram/:site/:year/:timestamp' render={({match}) =>
        <SunburstContainer site={match.params.site} year={match.params.year} wdd={conf['wayback-discover-diff']} timestamp={match.params.timestamp}
          loader={<Loading waybackLoaderPath={'https://users.it.teithe.gr/~it133996/wayback-loader.svg'} />}/>} />
    </Switch>
  </Router>, document.getElementById('wayback-diff'));

// function fetchData () {
//   var pathname = window.location.pathname;
//   if (pathname[pathname.length - 1] === '/') {
//     pathname = pathname.substring(0, pathname.length - 2);
//   }
//   let domain = pathname.split('/').pop();
//   let url = `${this.conf.cdxServer}search?url=${domain}/&status=200&fl=timestamp,digest&output=json`;
//   return fetch(url);
// }

// function fetchSnapshot (timestamp) {
//   var pathname = window.location.pathname;
//   if (pathname[pathname.length - 1] === '/') {
//     pathname = pathname.substring(0, pathname.length - 2);
//   }
//   pathname = pathname.split('/');
//   let domain = pathname.pop();
//   let url = this.conf.snapshotsPrefix + timestamp + '/' + domain;
//   console.log('------------This is working! ' + url);
//   return fetch(url);
// }

//  If using as a component in an other project uncomment the following line
// export DiffContainer from './components/diff-container.jsx';
