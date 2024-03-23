import { Repository } from '../../db/mock-repo.service';

export const deleteRecord = (
  repo: Repository<{ id: string }>,
  key: string,
  id: string,
) => {
  const filteredRecords = repo.getAll().filter((record) => record[key] === id);

  filteredRecords.forEach((record) => {
    record[key] = null;
  });
};
