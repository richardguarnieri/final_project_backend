const Data = () => {
    return (
        <div>
            <div class="container">
            <div class="row pt-5">
                <div class="col">
                    <h4 class="pb-3 mb-0">Search for Movies</h4>
                    <form action="" onSubmit="return false;">
                        <div class="form-floating">
                            <input type="text" class="form-control" id="date" placeholder="1/11/2011" />
                            <label for="date">Enter a date between 1/1/2010 and 1/13/2010</label>
                        </div>
                        <div class="form-floating mt-3">
                            <input type="text" class="form-control" id="state" placeholder="1/11/2012" />
                            <label for="state">Enter a state: i.e. ca</label>
                        </div>
                        <button type='button' class="btn btn-dark mt-3">Find Movies</button>
                    </form>
                </div>
            </div>

                <div class="row py-5">
                    <div class="col">
                        <table class="table table-hover">
                            <thead class="table-light">
                                <tr>
                                    <td>Date</td>
                                    <td>City</td>
                                    <td>State</td>
                                    <td>Country</td>
                                    <td>Shape</td>
                                    <td>Duration</td>
                                    <td>Comments</td>
                                </tr>
                            </thead>
                            <tbody>

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Data
