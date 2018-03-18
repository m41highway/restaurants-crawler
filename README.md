# restaurants-crawler

## Goal
This is the part 1 of the series of Restaurant Recommender Story. 
This project aims to crawl the number of restaurants in the first page of each district 

## Idea
Source: www.openrice.com
Automate the process to retrieve all restaurant information
The restaurant information is organized by district
There is pagination in each district page
Challenge: The number of restaurants in the first page of each district is different

## Pre-requistise
Bee-Queue (https://github.com/bee-queue/bee-queue)
Redis
Firebase

## Architecture
1. queue server definiation (queue-processor.js)
2. database (database.js)
3. server instance (app-1.js)
4. submit job client (count-restaurant-per-page.js)


Step to run:
1. start the queue server

2. submit the counting job