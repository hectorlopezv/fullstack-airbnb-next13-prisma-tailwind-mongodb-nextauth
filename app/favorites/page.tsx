import { getFavoritesListings } from "../actions/getFavoritesListings";
import { getCurrentUser } from "../actions/getSession";
import EmptyState from "../components/EmptyState";
import FavoritesClient from "../components/favorites/FavoritesClient";

type Props = {};

export default async function FavoritesPage({}: Props) {
  const currentUser = await getCurrentUser();
  const favorites = await getFavoritesListings();

  if (!currentUser) {
    return <EmptyState title="Unoathorized" subtitle="Please login" />;
  }

  if (favorites.length === 0) {
    return (
      <EmptyState
        title="No Favorites found"
        subtitle="Looks like you have no favorites listings"
      />
    );
  }

  return <FavoritesClient listings={favorites} currentUser={currentUser} />;
}
