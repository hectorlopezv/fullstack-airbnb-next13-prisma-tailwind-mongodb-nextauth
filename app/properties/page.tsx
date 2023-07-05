import { getListing } from "../actions/getListings";

import { getCurrentUser } from "../actions/getSession";
import EmptyState from "../components/EmptyState";
import PropertiesClient from "../components/properties/PropertiesClient";

type Props = {};

export default async function PropertiesPage({}: Props) {
  const currentUser = await getCurrentUser();
  const listings = await getListing({ userId: currentUser?.id });

  if (!currentUser) {
    return (
      <EmptyState
        title="No properties Found"
        subtitle="Looks like you dont have properties"
      />
    );
  }

  if (listings.length === 0) {
    return <EmptyState title="No trips" subtitle="You have no trips" />;
  }

  return <PropertiesClient listing={listings} currentUser={currentUser} />;
}
