# BX-marketplace (Project Report)

## Team members:

- Adrien Dumont
- Sacha Elalouf

## Features:

Not connected:
- See all the offers & requests on the homepage
- About section
- Search items in the offers via the searchbar
- Connect to the website via Google Authentification
- Click on the persons profile to see their phone number and email
- (This feature does not work properly because of a dependency conflict but you can click on 
each image and then click on the zoom button to see them in big, if you don't click on the zoom button it keeps loading)

Connected:
- The first time you signed up you will have to enter a phone number
- you can then access the settings page where you can change your phone number again
- you can sell some products (cataegory, description, price  mandatory and image optional)
- you can request some items
- you can buy some items via Paypal

## Run the project locally: 

1. Install all the dependencies:

```npm install```

2. Set up the ```.env.local```file with the different values below:

NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyDjZSknrvvsJlQ6Pa5sG9ADt8J4G92IDso
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=bx-marketplace.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=bx-marketplace
PAYPAL_CLIENT_ID=AdKzNwtv0EiOh_CphFWRqpeQcwm2q8-fxyHzlXg78JwJ9dJMIXLdyIXYB2wrIeneA2RvEobdh-LUAPyW
PAYPAL_CLIENT_SECRET=AdKzNwtv0EiOh_CphFWRqpeQcwm2q8-fxyHzlXg78JwJ9dJMIXLdyIXYB2wrIeneA2RvEobdh-LUAPyW

3. Run the project:

```npm run dev```

## Technologies used

- Next.js (Javascript Framework on-top of React.js)
- TailwindCSS
- Firebase

## Bx marketplace: 

Have you heard of Leboncoin, Vinted, eBay ? Of course you have. But do you know about BXmarketplace ?
It follows the same concept as those platforms : give a second life to objects and facilitate transactions, all in a safe environment. It was created by Ariel Flahaut, a bx24 student, but was just a telegram group chat until now. 
Seeing an opening, we decided (Adrien Dumont and Sacha Elalouf, two bx25 students taking the cse104 course) to create the website that would enable an easier seller-buyer communication.

Let us now describe the different functionalities of the website:

Without being connected, you can look at the different past items waiting to be sold, look at the “About us section”, and once on this section, you are able to click on the buy me a coffee section, which will redirect you to another website where you can donate money to support the idea. (This link wasn’t directly aimed at the teachers who will correct this project, but we won’t decline your credit card :)).
You can also contact the buyers and sellers by clicking on the email button, which will redirect you to your email app/website (depending on your computer setup)> 
You can also click on the sellers name to have all their information (name+phone number+email address)
However, other functionalities arise once connected. Indeed, you can start posting WTS (want to sell) or WTB (want to buy) announcements.
When selling an item, you are required to describe it, give a price and add a picture, which will then be posted on the website for all the other users to see. Once connected you have also the possibility to access the settings tab and you can also pay via paypal.
Although it is an online website that anyone can access, we can at all times easily delete announcements that are inappropriate.

Look at the public/example.png to see how the webpage should look like  - In case of any errors contact at adrien.dumont@polytechnique.edu