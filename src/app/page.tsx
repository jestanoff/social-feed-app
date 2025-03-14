"use client";

import { useEffect, useRef } from "react";
import { Box, Typography } from "@mui/material";
import { useInView } from "react-intersection-observer";
import { trpcReact } from "@/trpc/trpcReact";
import Feed from "./components/Feed";
import PostsSkeleton from "./components/PostsSkeleton";

export default function Home() {
  const fetchingRef = useRef(false);
  const { ref: loadingRef, inView: isLoadingVisible } = useInView({
    rootMargin: "50%",
    threshold: 0.1,
  });

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isFetching } = trpcReact.getPosts.useInfiniteQuery(
    { limit: 20 },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
  );

  useEffect(() => {
    const shouldFetch = isLoadingVisible && hasNextPage && !isFetchingNextPage && !isFetching && !fetchingRef.current;

    if (shouldFetch) {
      fetchingRef.current = true;
      fetchNextPage().finally(() => {
        fetchingRef.current = false;
      });
    }
  }, [isLoadingVisible, hasNextPage, fetchNextPage, isFetchingNextPage, isFetching]);

  return (
    <Box>
      <Typography variant="h4" component={"h1"} sx={{ marginBottom: 4 }}>
        Posts
      </Typography>
      {data?.pages ? (
        data.pages.map((page, pageIndex) => <Feed key={pageIndex} posts={page.posts} />)
      ) : (
        <PostsSkeleton num={5} />
      )}
      <Box ref={loadingRef} sx={{ height: 200 }}>
        {isFetchingNextPage && <PostsSkeleton num={1} />}
      </Box>
    </Box>
  );
}
